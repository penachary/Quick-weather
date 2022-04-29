import { WHEATHER_DAILY_API_URL, WHEATHER_HOURLY_API_URL, GEOCODE_API_URL } from "./config.js";

export const stateDaily = {
    lng:"",
    lat:"",
    continent: "",
    country: "",
    city: "",
    localTime:"",
    temperature:"",
    wheatherCode: "",
    dayTemp: "",
    nightTemp:"",
    feels: "",
    sunrise:"",
    sunset:"",
    pressure:"",
    humidity:"",
    cloudCover:"",
    windGust:"",
    windSpeed:"",
    windDirection:"",
} 

const getPosition = function(){
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}
const getJSON = function(url, errorMsg = "Something went wrong!!!"){
    return fetch(url).then(response => {
        if(!response.ok) throw new Error( `${errorMsg} (${response.status})`);
        return response.json()
    });
};
export const wheatherForecast = async function () {
      try{const pos = await getPosition();
        console.log(pos);
        const {latitude: lat, longitude: lng} = pos.coords;
        const wheatherDaily = WHEATHER_DAILY_API_URL(lat, lng, "Europe", "Istanbul");
        const wheatherHourly = WHEATHER_HOURLY_API_URL(lat, lng);
        const data = await Promise.all([getJSON(wheatherDaily), getJSON(wheatherHourly)]);
        //  console.log(data);
         stateDaily.dayTemp = data[0].daily.temperature_2m_max[0];
         stateDaily.nightTemp = data[0].daily.temperature_2m_min[0];
         stateDaily.sunrise = data[0].daily.sunrise[0];
         stateDaily.sunset = data[0].daily.sunset[0];
         stateDaily.feels = data[1].hourly.apparent_temperature[0];
         stateDaily.cloudCover = data[1].hourly.cloudcover[0];
         stateDaily.pressure = data[1].hourly.pressure_msl[0];
         stateDaily.humidity = data[1].hourly.relativehumidity_2m[0];
         stateDaily.temperature = data[1].hourly.temperature_2m[0];
         stateDaily.wheatherCode = data[1].hourly.weathercode[0];
         stateDaily.windDirection = data[1].hourly.winddirection_10m[0];
         stateDaily.windGust = data[1].hourly.windgusts_10m[0];
         stateDaily.windSpeed = data[1].hourly.windspeed_10m[0];
        }catch(err){
            console.log(err);
        }
  };
  export const geocoding = async function () {
    try {
      const res = await fetch(
          GEOCODE_API_URL("istanbul")
      );
      if (!res.ok) throw new Error("problem");
      const data = await res.json();
      console.log(data);

    } catch (err) {
      console.log(err);
    }
  };


  // RWxfwMiPTuHmmMweiMxhzcgk8iMusjj2