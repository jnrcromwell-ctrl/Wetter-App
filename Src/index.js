function currentTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  let Temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#speed-wind");
  let timeElement = document.querySelector("#Time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" >`;
  temperatureElement.innerHTML = Math.round(Temperature);
  timeElement.innerHTML = formatDate(date);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}

function searchCity(city) {
  apiKey = "46c475f9b893a640eao8tff022cb86a5";
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentTemp);
}

function submitBox(event) {
  event.preventDefault();

  let searchElement = document.querySelector("#search-Input");

  searchCity(searchElement.value);
}

function getForecast(city){
    let apiKey="46c475f9b893a640eao8tff022cb86a5"
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayFeatures);
}

function formatDay(timestamp){
  let date= new Date(timestamp * 1000);
 let days = ["Sun", "Mon", "Tue", "Wed", "Thus", "Fri", "Sat"];

 return days[date.getDay()];
}

function displayFeatures(response) {
console.log(response.data);
 
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if( index < 5){
    forecastHTML =
      forecastHTML +
      `
     <div class="wetter-day">
       <div class="wetter-date">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" class="wetter-icon"/>
        
          <div class="wetter-temperatures">
            <div class="wetter-temperature"><strong>${Math.round(day.temperature.maximum)}°</strong> 
            </div>
              <div class="wetter-temperature">${Math.round(day.temperature.minimum)}°</div>
          </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchformElemnt = document.querySelector("#search-form");
searchformElemnt.addEventListener("submit", submitBox);

searchCity("Paris");

