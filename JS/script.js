import * as module from "./module.js";
import { weatherCodes } from "./config.js";
import { markupEcma } from "./view.js";

const btnDegrees = document.querySelectorAll(".degree-symbol");
const btnCelcius = document.getElementById("celcius");
const btnFahrenheit = document.getElementById("fahrenheit");
const btnChangeBars = document.querySelectorAll(".bar");
const firstContentContainer = document.querySelector(".first-box");
const secondContentContainer = document.querySelector(".second-box");
const currentLocationContainer = document.querySelector(".current-location");
const currentDateContainer = document.querySelector(".current-date");

console.log(markupEcma);
btnDegrees.forEach((btn) =>
  btn.addEventListener("click", function () {
    if (btn.classList.contains("switch-degree-btn")) return;
    btnDegrees.forEach((btn) => btn.classList.toggle("switch-degree-btn"));
  })
);
btnChangeBars.forEach((btn) =>
  btn.addEventListener("click", function () {
    if (btn.classList.contains("bar-switch")) return;
    btnChangeBars.forEach((btn) => btn.classList.remove("bar-switch"));
    btn.classList.add("bar-switch");
  })
);
const showUpdateTime = function () {
  const markup = `
  <span> ${module.currentDate()} </span>
  `;
  currentDateContainer.innerHTML = "";
  currentDateContainer.insertAdjacentHTML("afterbegin", markup);
};
showUpdateTime();
setInterval(showUpdateTime, 1000);

const showWeather = async function () {
  try {
    await module.wheatherForecast();
    const dailyData = module.stateDaily;

    const markupCurrentDate = `
    <span>${dailyData.country}, ${dailyData.city} </span>
    `;
    currentLocationContainer.insertAdjacentHTML(
      "afterbegin",
      markupCurrentDate
    );

    const markup1 = `
    <h2 class="main-adress">${dailyData.country}, ${dailyData.city}</h2>
    <div class="content-main-box">
      <div class="main-degree-box">
        <span class="main-degree">${dailyData.temperature}&#176;</span>
      </div>
      <div class="main-icon-box">
        <img class="main-icon" src="./icons/${
          dailyData.weatherCode
        }.svg" alt="icons">
      </div>
      <div class="main-wheather-detail-box"> 
        <p class="main-wheather-detail">${
          weatherCodes[dailyData.weatherCode]
        }</p>
      </div>
      <div class="main-daynight-box">
        <span class="main-daynight" >Day ${dailyData.dayTemp}&#176; - Night ${
      dailyData.nightTemp
    }&#176;</span>
      </div>
    </div>
    `;

    firstContentContainer.insertAdjacentHTML("afterbegin", markup1);

    const markup2 = `
    <div class="fells-sun-icons-container">
      <div class="feels-box">
        <p>Feels  <br> ${dailyData.feels}&#176;</p>
      </div>
      <div class="sunrise-set-box">
        <div class="sunrise-box">
          <img src="./icons/sunrise-0.svg" alt="sunrise" class="sunrise-set sunrise-icons">
          <img src="./icons/sunset-0.svg" alt="sunset" class="sunrise-set sunrise-icons">
        </div>
        <div class="sunrise-box">
          <span class="sunrise-set sunrise-time"> ${dailyData.sunrise}</span> 
          <span class="sunrise-set sunrise-time"> ${dailyData.sunset}</span>
        </div>
      </div>
    </div>
    <ul class="list-group-daily daily-group1">
      <li class="list-daily">Pressure ${dailyData.pressure}hPa</li>
      <li class="list-daily">Humidity ${dailyData.humidity}%</li>
      <li class="list-daily">Cloud cover ${dailyData.cloudCover}% </li>
    </ul>
    <ul class="list-group-daily daily-group2">
      <li class="list-daily">Windgust ${dailyData.windGust}km/h</li>
      <li class="list-daily">Windspeed  ${dailyData.windSpeed}km/h</li>
      <li class="list-daily">Wind direction  ${dailyData.windDirection}&#176;</li>
    </ul>
    `;
    secondContentContainer.insertAdjacentHTML("afterbegin", markup2);
  } catch (err) {
    alert(err);
  }
};
showWeather();

// funtion for spliting array into smaller pieces
Object.defineProperty(Array.prototype, "chunk", {
  value: function (chunkSize) {
    let R = [];
    for (let i = 0; i < this.length; i += chunkSize)
      R.push(this.slice(i, i + chunkSize));
    return R;
  },
});
