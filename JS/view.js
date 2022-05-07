
// import { stateWeekly } from "./module";

// export const weeklyMarkup = async function(){
//   try{

//     const markupMaker =  function (num) {
//      const  markup = `
//       <h2 class="weekly-adress">${stateWeekly.country}, ${stateWeekly.city} date</h2>
//       <div class="weekly-box">
//         <div class="weekly-temp-box">
//           <p class="day-night-weekly">DAY <br></p>
//           <span class="day-night-temp-weekly">${stateWeekly.dayTemp[num]}&#176; <br></span>
//           <span class="feels-temp-weekly">${stateWeekly.dayTempFeel[num]}&#176;</span>
//           <span class="feels-weekly">feel</span>
//         </div>
//         <div class="weekly-temp-box">
//           <p class="day-night-weekly">Night <br></p>
//           <span class="day-night-temp-weekly">${stateWeekly.nightTemp[num]}&#176; <br></span>
//           <span class="feels-temp-weekly">${stateWeekly.nightTempFeel[num]}&#176;</span>
//           <span class="feels-weekly">feel</span>
//         </div>
//         <div class="weekly-icon-box">
//           <img src="./icons/${stateWeekly.weatherCode[num]}.svg" alt="" srcset="">
//         </div>
//       </div>
//       <div class="weekly-box">
//         <ul class="list-group-weekly">
//           <li class="list-weekly ">Cloud cover: ${stateWeekly.cloudCover[num]}%</li>
//           <li class="list-weekly ">Rainy hours: ${stateWeekly.rainyHours[num]}h</li>
//           <li class="list-weekly ">Solar radiation: ${stateWeekly.solarRadiation[num]}MJ/m² </li>
//         </ul>
//         <ul class="list-group-weekly">
//           <li class="list-weekly ">Windgust: ${stateWeekly.windGust[num]}km/h</li>
//           <li class="list-weekly ">Windspeed: ${stateWeekly.windSpeed[num]}km/h</li>
//           <li class="list-weekly ">Wind direction: ${stateWeekly.windDirection[num]}&#176;</li>
//         </ul>
//       </div> `;
//       return markup;
//     };

//     let markup = "";
//     for (let i = 0; i < 8; i++) {
//     markup += await markupMaker(i);
//     }
//     return markup;
//   }catch (err){
//     console.log(err);
//   }
// } 
// console.log(weeklyMarkup());

export const markupMaker =  function (num) {
  const  markup =`
   <h2 class="weekly-adress">${stateWeekly.country}, ${stateWeekly.city} date</h2>
   <div class="weekly-box">
     <div class="weekly-temp-box">
       <p class="day-night-weekly">DAY <br></p>
       <span class="day-night-temp-weekly">${stateWeekly.dayTemp[num]}&#176; <br></span>
       <span class="feels-temp-weekly">${stateWeekly.dayTempFeel[num]}&#176;</span>
       <span class="feels-weekly">feel</span>
     </div>
     <div class="weekly-temp-box">
       <p class="day-night-weekly">Night <br></p>
       <span class="day-night-temp-weekly">${stateWeekly.nightTemp[num]}&#176; <br></span>
       <span class="feels-temp-weekly">${stateWeekly.nightTempFeel[num]}&#176;</span>
       <span class="feels-weekly">feel</span>
     </div>
     <div class="weekly-icon-box">
       <img src="./icons/${stateWeekly.weatherCode[num]}.svg" alt="" srcset="">
     </div>
   </div>
   <div class="weekly-box">
     <ul class="list-group-weekly">
       <li class="list-weekly ">Cloud cover: ${stateWeekly.cloudCover[num]}%</li>
       <li class="list-weekly ">Rainy hours: ${stateWeekly.rainyHours[num]}h</li>
       <li class="list-weekly ">Solar radiation: ${stateWeekly.solarRadiation[num]}MJ/m² </li>
     </ul>
     <ul class="list-group-weekly">
       <li class="list-weekly ">Windgust: ${stateWeekly.windGust[num]}km/h</li>
       <li class="list-weekly ">Windspeed: ${stateWeekly.windSpeed[num]}km/h</li>
       <li class="list-weekly ">Wind direction: ${stateWeekly.windDirection[num]}&#176;</li>
     </ul>
   </div> `;
   return markup;
 };

// `
// <h2 class="weekly-adress">Country, City date</h2>
// <div class="weekly-box">
//   <div class="weekly-temp-box">
//     <p class="day-night-weekly">DAY <br></p>
//     <span class="day-night-temp-weekly">15&#176; <br></span>
//     <span class="feels-temp-weekly">12&#176;</span>
//     <span class="feels-weekly">feel</span>
//   </div>
//   <div class="weekly-temp-box">
//     <p class="day-night-weekly">Night <br></p>
//     <span class="day-night-temp-weekly">9&#176; <br></span>
//     <span class="feels-temp-weekly">8&#176;</span>
//     <span class="feels-weekly">feel</span>
//   </div>
//   <div class="weekly-icon-box">
//     <img src="./icons/1-day.svg" alt="" srcset="">
//   </div>
// </div>
// <div class="weekly-box">
//   <ul class="list-group-weekly">
//     <li class="list-weekly ">Cloud cover: 20%</li>
//     <li class="list-weekly ">Rainy hours: 3h</li>
//     <li class="list-weekly ">Solar radiation: 45 </li>
//   </ul>
//   <ul class="list-group-weekly">
//     <li class="list-weekly ">Windgust: 10km/h</li>
//     <li class="list-weekly ">Windspeed: 12km/h</li>
//     <li class="list-weekly ">Wind direction: 10&#176;</li>
//   </ul>
// </div> 
// `



// class ViewWeekly {
  //   parentElement = document.querySelector(".weekly-main-box");
  //   markup="";
  
  //   markupMaker(num){
  //     return `
  //       <ul class="list-group-daily daily-group1">
  //             <li class="list-daily">Pressure $${data.pressure[num]}hPa</li>
  //             <li class="list-daily">Humidity ${data.humadity[num]}%</li>
  //             <li class="list-daily">Cloud cover ${data.cover[num]}% </li>
  //       </ul>`;
  //   };
  
  //   markapAdder(){
  //     for (let i = 0; i < 3; i++) {
  //     this.markup += this.markupMaker(i);
  //     }
  //   };
  
  //   render(){
  //     this.parentElement.insertAdjacentHTML("afterbegin", this.markup)
  //   };
  
  // };
