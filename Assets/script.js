let searchButton = $("#search-button");
let searchCity = $("#search-city");
let currentWeather = $("#current-weather");
let currentCity = $("#current-city");
let temperature = $("#current-temperature");
let humidityIE = $("#current-humidity");
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