let apiKey = "28t4boad8ba39864f1579209a00b107e";
const cityTimeZones = {
  Nairobi: "Africa/Nairobi",
  Paris: "Europe/Paris",
  Lisbon: "Europe/Lisbon",
};
function formatDate(timeZone) {
  let now = new Date();
  return now.toLocaleString("en-US", {
    timeZone: timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
function displayWeather(response) {
  let cityElement = document.querySelector("#city-name");
  let temperatureElement = document.querySelector("#temperature");
  let currentTime = document.querySelector("#current-date-time");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#weather-icon");
  let city = response.data.city;
  cityElement.innerHTML = city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.innerHTML = `
    <img 
      src="${response.data.condition.icon_url}" 
      alt="${response.data.condition.description}" 
    />
  `;
  let timeZone = cityTimeZones[city];

  if (timeZone) {
    currentTime.innerHTML = formatDate(timeZone);
  } else {
    currentTime.innerHTML = "Time unavailable";
  }
}
function searchCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);
