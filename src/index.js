function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

// Searching for City typed in Search Bar

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  searchCity(searchInput.value);
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2ff317fbbf031c75547856bb3b8a124d`;
  axios.get(apiUrl).then(showDetails);
}

// Searching for name, temperature, weather details, and coordinates of City typed in Search Bar
function showDetails(response) {
  celsiusTemp = response.data.main.temp;

  let city = document.querySelector("#city-searched");
  city.innerHTML = response.data.name;

  let temp = Math.round(celsiusTemp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temp}`;

  let description = document.querySelector(".dsc");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#hum");
  humidity.innerHTML = response.data.main.humidity;

  let speed = document.querySelector("#windy");
  speed.innerHTML = response.data.wind.speed;

  let date = document.querySelector("#time");
  date.innerHTML = formatDate(response.data.dt * 1000);

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  let lat = response.data.coord.lat;
  let long = response.data.coord.lon;
  let latitude = document.querySelector("#lat");
  let longitude = document.querySelector("#long");
  latitude.innerHTML = `${lat}`;
  longitude.innerHTML = `${long}`;
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celsiusTemp);
}

let button = document.querySelector("#search-button");
button.addEventListener("click", search);

let celsiusTemp = null;

let form = document.querySelector("#choose-city");
form.addEventListener("submit", search);

let citySearch = document.getElementById("city-search");
citySearch.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("search-button").click();
  }
});

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

searchCity("Tokyo");
