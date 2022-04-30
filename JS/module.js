import { WHEATHER_DAILY_API_URL, WHEATHER_HOURLY_API_URL, GEOCODE_API_URL, GEOCODE_API_BY_IP_URL, } from "./config.js";

export const stateDaily = {
    lng:"",
    lat:"",
    continent: "",
    country: "",
    city: "",
    localTime:"",
    timezone:"",
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
     // const pos = await getPosition();
      //   console.log(pos);
      //   const {latitude: lat, longitude: lng} = pos.coords;
export const geocodingAPIbyIP = async function () {
  try {
    const res = await fetch(GEOCODE_API_BY_IP_URL);
    if (!res.ok) throw new Error("problem");
    const data = await res.json();
    return data;

  } catch (err) {
    console.log(err);
  }
};

const getJSON = function(url, errorMsg = "Something went wrong!!!"){
    return fetch(url).then(response => {
        if(!response.ok) throw new Error( `${errorMsg} (${response.status})`);
        return response.json()
    });
};
export const wheatherForecast = async function () {
      try{
          const dataIP = await geocodingAPIbyIP();
          // console.log(dataIP);
          stateDaily.country = dataIP.country.isoName;
          stateDaily.city = dataIP.location.city;
          stateDaily.lng = dataIP.location.longitude;
          stateDaily.lat = dataIP.location.latitude;
          stateDaily.localTime = +dataIP.location.timeZone.localTime.slice(11,13);
          stateDaily.timezone = dataIP.location.timeZone.ianaTimeId;
          stateDaily.continent = dataIP.location.timeZone.ianaTimeId.split("/")[0];

          const wheatherDaily = await WHEATHER_DAILY_API_URL(stateDaily.lat, stateDaily.lng, stateDaily.continent, stateDaily.city);
          const wheatherHourly = await WHEATHER_HOURLY_API_URL(stateDaily.lat, stateDaily.lng);
          const data = await Promise.all([getJSON(wheatherDaily), getJSON(wheatherHourly)]);
          //  console.log(data);
          stateDaily.dayTemp = data[0].daily.temperature_2m_max[0];
          stateDaily.nightTemp = data[0].daily.temperature_2m_min[0];
          stateDaily.sunrise = data[0].daily.sunrise[0].slice(11);
          stateDaily.sunset = data[0].daily.sunset[0].slice(11);
          stateDaily.feels = data[1].hourly.apparent_temperature[stateDaily.localTime];
          stateDaily.cloudCover = data[1].hourly.cloudcover[stateDaily.localTime];
          stateDaily.pressure = data[1].hourly.pressure_msl[stateDaily.localTime];
          stateDaily.humidity = data[1].hourly.relativehumidity_2m[stateDaily.localTime];
          stateDaily.temperature = data[1].hourly.temperature_2m[stateDaily.localTime];
          stateDaily.wheatherCode = data[1].hourly.weathercode[stateDaily.localTime];
          stateDaily.windDirection = data[1].hourly.winddirection_10m[stateDaily.localTime];
          stateDaily.windGust = data[1].hourly.windgusts_10m[stateDaily.localTime];
          stateDaily.windSpeed = data[1].hourly.windspeed_10m[stateDaily.localTime];
          // console.log(data);
          console.log(stateDaily);
        }catch(err){
            console.log(err);
        }
  };
  // export const geocodingAPI = async function () {
  //   try {
  //     const res = await fetch(
  //         GEOCODE_API_URL("istanbul")
  //     );
  //     if (!res.ok) throw new Error("problem");
  //     const data = await res.json();
  //     console.log(data);

  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
