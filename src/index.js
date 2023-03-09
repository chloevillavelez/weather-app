let now = new Date();

let schedule = document.querySelector("#date");
let date = now.getDate();
let hours = now.getHours();

let minutes = now.getMinutes(); // add this to next HW output
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()]; // 0 and 6

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()]; // 0 and 11

schedule.innerHTML = `${day} ${month} ${date}, ${year} ${hours}:${minutes}`;

// Searching for City typed in Search Bar
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  let city = document.querySelector("#city-searched");
  city.innerHTML = `${searchInput.value}`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=2ff317fbbf031c75547856bb3b8a124d`;

  // Searching for name, temperature, and coordinates of City typed in Search Bar
  function showDetails(response) {
    let temp = Math.round(response.data.main.temp);
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = `${temp}`;

    let lat = response.data.coord.lat;
    let long = response.data.coord.lon;
    let latitude = document.querySelector("#lat");
    let longitude = document.querySelector("#long");
    latitude.innerHTML = `${lat}`;
    longitude.innerHTML = `${long}`;
  }

  axios.get(apiUrl).then(showDetails);
}

let button = document.querySelector("#search-button");
button.addEventListener("click", search);

let form = document.querySelector("#choose-city");
form.addEventListener("submit", search);

let citySearch = document.getElementById("city-search");
citySearch.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("search-button").click();
  }
});
