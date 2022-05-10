import * as module from "./module.js";
import { weatherCodes } from "./config.js";

const btnDegrees = document.querySelectorAll(".degree-symbol");
const btnCelcius = document.getElementById("celcius");
const btnFahrenheit = document.getElementById("fahrenheit");
const btnChangeBars = document.querySelectorAll(".bar");
const btnHourly = document.querySelector(".btn-hourly");
const btnToday = document.querySelector(".btn-today");
const btnweekly = document.querySelector(".btn-weekly");
const firstContentContainer = document.querySelector(".first-box");
const secondContentContainer = document.querySelector(".second-box");
const currentLocationContainer = document.querySelector(".current-location");
const currentDateContainer = document.querySelector(".current-date");
const todayContainer = document.querySelector(".today-container");
const weeklyContainer = document.querySelector(".weekly-container");
const hourlyContainer = document.querySelector(".hourly-container");
const hourlyBox = document.querySelector(".accordion");
const allContentContainers = document.querySelectorAll(".content-container");

//Degree buttons change effect
btnDegrees.forEach((btn) =>
  btn.addEventListener("click", function () {
    if (btn.classList.contains("switch-degree-btn")) return;
    btnDegrees.forEach((btn) => btn.classList.toggle("switch-degree-btn"));
  })
);
// Container buttons change effect
btnChangeBars.forEach((btn) =>
  btn.addEventListener("click", function () {
    if (btn.classList.contains("bar-switch")) return;
    btnChangeBars.forEach((btn) => btn.classList.remove("bar-switch"));
    btn.classList.add("bar-switch");
  })
);

// Adding Containers hidden class
btnToday.addEventListener("click", function(){
  if(!todayContainer.classList.contains("hidden")) return
  allContentContainers.forEach(el => el.classList.add("hidden"));
  todayContainer.classList.remove("hidden");
});

btnweekly.addEventListener("click", function(){
  if(!weeklyContainer.classList.contains("hidden")) return
  allContentContainers.forEach(el => el.classList.add("hidden"));
  weeklyContainer.classList.remove("hidden");
});

btnHourly.addEventListener("click", function(){
  if(!hourlyContainer.classList.contains("hidden")) return
  allContentContainers.forEach(el => el.classList.add("hidden"));
  hourlyContainer.classList.remove("hidden");
});

//Date and Time rendered 
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
    const weeklyData = module.stateWeekly;
    const hourlyData = module.stateHourly;

    // current Date and country container
    const markupCurrentDate = `
    <span>${dailyData.country}, ${dailyData.city} </span>
    `;
    currentLocationContainer.insertAdjacentHTML(
      "afterbegin",
      markupCurrentDate
    );
    // Today firts container
    const markup1Today = `
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

    firstContentContainer.insertAdjacentHTML("afterbegin", markup1Today);
    // Today second container
    const markup2Today = `
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
    secondContentContainer.insertAdjacentHTML("afterbegin", markup2Today);

    //Weekly Container
    const markupMakerWeekly = function (num) {
      return `
      <div class="content-box weekly-main-box">
        <h2 class="weekly-adress">${weeklyData.country}, ${weeklyData.city} ${weeklyData.date[num]}</h2>
        <div class="weekly-box">
        <div class="weekly-temp-box">
        <p class="day-night-weekly">DAY <br></p>
        <span class="day-night-temp-weekly">${weeklyData.dayTemp[num]}&#176; <br></span>
          <span class="feels-temp-weekly">${weeklyData.dayTempFeel[num]}&#176;</span>
          <span class="feels-weekly">feel</span>
          </div>
          <div class="weekly-temp-box">
          <p class="day-night-weekly">Night <br></p>
          <span class="day-night-temp-weekly">${weeklyData.nightTemp[num]}&#176; <br></span>
          <span class="feels-temp-weekly">${weeklyData.nightTempFeel[num]}&#176;</span>
          <span class="feels-weekly">feel</span>
          </div>
        <div class="weekly-icon-box">
        <img src="./icons/${weeklyData.weatherCode[num]}.svg" alt="" srcset="">
        </div>
        </div>
        <div class="weekly-box">
        <ul class="list-group-weekly">
        <li class="list-weekly ">Cloud cover: ${weeklyData.cloudCover[num]}%</li>
        <li class="list-weekly ">Rainy hours: ${weeklyData.rainyHours[num]}h</li>
          <li class="list-weekly ">Solar radiation: ${weeklyData.solarRadiation[num]}MJ/m² </li>
        </ul>
        <ul class="list-group-weekly">
        <li class="list-weekly ">Windgust: ${weeklyData.windGust[num]}km/h</li>
        <li class="list-weekly ">Windspeed: ${weeklyData.windSpeed[num]}km/h</li>
        <li class="list-weekly ">Wind direction: ${weeklyData.windDirection[num]}&#176;</li>
        </ul>
        </div>
        </div> `;
    };

    let markupWeekly = "";
    for (let i = 0; i < 7; i++) {
      markupWeekly += markupMakerWeekly(i);
    }
    weeklyContainer.insertAdjacentHTML("afterbegin", markupWeekly);

    // Reveal weekly box
const allWeeklyBoxes = document.querySelectorAll(".weekly-main-box");

const revealBoxes = function(entries, observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.classList.remove("hidden-weekly-box");
  observer.unobserve(entry.target);
}
const weeklyBoxObserver = new IntersectionObserver(revealBoxes, {
  root: null,
  threshold: 0.15,
})

allWeeklyBoxes.forEach(function(box){
  weeklyBoxObserver.observe(box);
  box.classList.add("hidden-weekly-box");
})


// Hourly Container
const markupMakerHourly = function(num){
  return`
  <div class="accordion-item">
  <h2 class="accordion-header" id="flush-heading${num + 1}">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${num + 1}" aria-expanded="false" aria-controls="flush-collapse${num + 1}">
      ${hourlyData.date[num]} ${hourlyData.hour[num]} <span class="hourly-temp"><img src="./icons/${hourlyData.weatherCode[num]}.svg" alt="" srcset="" class="hourly-icon">${hourlyData.temperature[num]}&#176;C</span> 
    </button>
  </h2>
  <div id="flush-collapse${num + 1}" class="accordion-collapse collapse" aria-labelledby="flush-heading${num + 1}" data-bs-parent="#accordionFlushExample">
    <div class="accordion-body">The weather is ${weatherCodes[hourlyData.weatherCode[num]]} and feels ${hourlyData.feelsTemp[num]}&#176;C, relative humadity is $${hourlyData.humadity[num]}% and the cloud covers ${hourlyData.cloudCover[num]}% of the sky.</div>
  </div>
  </div>`;
}

let markupHourly = "";
for (let i = 0; i < 12; i++) {
  markupHourly += markupMakerHourly(i);
}

hourlyBox.insertAdjacentHTML("afterbegin", markupHourly);

  } catch (err) {
    alert(err);
  }
};
showWeather();

// 