import * as module from "./module.js";

const btnDegrees = document.querySelectorAll(".degree-symbol");
const btnCelcius = document.getElementById("celcius");
const btnFahrenheit = document.getElementById("fahrenheit");
const btnChangeBars = document.querySelectorAll(".bar");

btnDegrees.forEach((btn) =>
  btn.addEventListener("click", function () {
    if (btn.classList.contains("switch-degree-btn")) return;
    btnDegrees.forEach(btn => btn.classList.toggle("switch-degree-btn"))
  })
);
btnChangeBars.forEach((btn) =>
btn.addEventListener("click", function () {
  if (btn.classList.contains("bar-switch")) return;
  btnChangeBars.forEach(btn => btn.classList.remove("bar-switch"))
  btn.classList.add("bar-switch");
})
);

module.geocoding();
module.wheatherForecast();


