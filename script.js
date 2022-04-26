"use strict";
const btnDegrees = document.querySelectorAll(".degree-symbol");
const btnCelcius = document.getElementById("celcius");
const btnFahrenheit = document.getElementById("fahrenheit");
btnDegrees.forEach((btn) =>
  btn.addEventListener("click", function () {
    if (btn.classList.contains("switch-degree-btn")) return;
    btnCelcius.classList.toggle("switch-degree-btn");
    btnFahrenheit.classList.toggle("switch-degree-btn");
  })
);

const countrucode = async function () {
  try {
    // const res = await fetch("http://dataservice.accuweather.com/locations/v1/cities/search?apikey=RWxfwMiPTuHmmMweiMxhzcgk8iMusjj2&q=istanbul&language=en&details=true");
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=41.02&longitude=28.96&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum&timezone=Europe%2FBerlin"
    );
    // const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.02&longitude=28.96&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,pressure_msl,precipitation,weathercode,shortwave_radiation,direct_radiation,diffuse_radiation,direct_normal_irradiance,evapotranspiration,vapor_pressure_deficit,windspeed_10m,winddirection_10m,windgusts_10m");
    if (!res.ok) throw new Error("problem");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
// countrucode();
const wheather = async function () {
  try {
    const res = await fetch(
      "http://api.positionstack.com/v1/forward?access_key=1ecc74fc50e4b04c284b0b718ca84c6d&query=moscow"
    );
    // const res = await fetch("http://dataservice.accuweather.com/forecasts/v1/daily/5day/318251?apikey=RWxfwMiPTuHmmMweiMxhzcgk8iMusjj2&language=en&details=true&metric=true");
    if (!res.ok) throw new Error("problem");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
// wheather();
// RWxfwMiPTuHmmMweiMxhzcgk8iMusjj2
