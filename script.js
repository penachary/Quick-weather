"use strict";
const btnDegrees = document.querySelectorAll(".degree-symbol");
const btnCelcius = document.getElementById("celcius");
const btnFahrenheit = document.getElementById("fahrenheit");
btnDegrees.forEach((btn) =>
  btn.addEventListener("click", function () {
    btnCelcius.classList.toggle("switch-degree-btn");
    btnFahrenheit.classList.toggle("switch-degree-btn");
  })
);
