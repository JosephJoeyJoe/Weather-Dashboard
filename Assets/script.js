let searchButton = $("#search-button");
let searchCity = $("#search-city");
let currentWeather = $("#current-weather");
let currentCity = $("#current-city");
let temperature = $("#current-temperature");
let humidity1 = $("#current-humidity");
let windSpeed = $("#current-windspeed");
let uv = $("#current-uv");
let futucurrentWeather = $("#future-weather");
let listGroup = $(".list-group");
let sCity = [];
let city='';
let fiveDayContainer = $('fiveDay-Container');
let clearButton = $('#clear-history');
const myAPI = "3d3118e26c3310a4674681850c3411bd";

searchButton.on("click", init);
clearButton.on("click", clearHistory);

function init(event){
    let city = searchCity.val();
    getCurrentWeather(city);
    forecast(city);
}

function getCurrentWeather(city) {
 var weatherAPI =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    myAPI;
  console.log(weatherAPI);
  fetch(weatherAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let weathericon = data.weather[0].icon;
      console.log(weathericon);
      let weatherIconUrl =
        "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
      let tempC = data.main.temp_max;
      let tempF=(((tempC-273.5)*1.80)+32).toFixed(2);
      let humidity = data.main.humidity;
      let speed = data.wind.speed;
      let date = new Date(data.dt*1000).toLocaleDateString()
      temperature.text(tempF + "F");
      humidity1.text(humidity);
      windSpeed.text(speed);
      currentCity.html(data.name +"("+date+")" + "<img src="+weatherIconUrl+">");
      getuv(data.coord.lat, data.coord.lon);
     if(data.cod==200){
        sCity=JSON.parse(localStorage.getItem("cityname"));
        console.log(sCity);
        if (sCity==null){
            sCity=[];
            sCity.push(city.toUpperCase()
            );
            localStorage.setItem("cityname",JSON.stringify(sCity));
            addToList(city);
        }
        else {
            if(find(city) > 0){
                sCity.push(city.toUpperCase());
                localStorage.setItem("cityname",JSON.stringify(sCity));
                addToList(city);
            }
        }
    }
      
    });
}

function addToList(c){
    var listEl= $("<li>"+c.toUpperCase()+"</li>");
    $(listEl).attr("class","list-group-item");
    $(listEl).attr("data-value",c.toUpperCase());
    $(".list-group").append(listEl);
}

function invokePastSearch(event){
    var liEl=event.target;
    if (event.target.matches("li")){
        city=liEl.textContent.trim();
        currentWeather(city);
    }

}
function loadlastCity(){
    $("ul").empty();
    var sCity = JSON.parse(localStorage.getItem("cityname"));
    if(sCity!==null){
        sCity=JSON.parse(localStorage.getItem("cityname"));
        for(i=0; i<sCity.length;i++){
            addToList(sCity[i]);
        }
        city=sCity[i-1];
        currentWeather(city);
    }
}
function clearHistory(event){
    event.preventDefault();
    sCity=[];
    localStorage.removeItem("cityname");
    document.location.reload();
}
function getuv(lat, lon) {
  var uvAPI =
    `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=` +
    myAPI;
  fetch(uvAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      uv.text(data.value);
    });
}
function forecast(cityID) {
  var fiveDayForecastAPI =
    "https://api.openweathermap.org/data/2.5/forecast?q=" + cityID + "&appid=" + myAPI;

  fetch(fiveDayForecastAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let items = data.list;
       for (i = 0; i < items.length; i++) {
        console.log(items[i]);
    
        let date= new Date((data.list[i].dt)*1000).toLocaleDateString();
        let iconcode= data.list[i].weather[0].icon;
        let iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
        let tempC= data.list[i].main.temp;
        let tempF=(((tempC-273.5)*1.80)+32).toFixed(2);
        let humidity= data.list[i].main.humidity;
        
        $("#date"+i).text(date);
        $("#img"+i).html("<img src="+iconurl+">");
        $("#temp"+i).text(" " + tempF+" "+"F");
        $("#humidity"+i).text(" " + humidity + "%");
       }
    });
}