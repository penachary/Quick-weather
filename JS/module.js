import {
  WHEATHER_DAILY_API_URL,
  WHEATHER_HOURLY_API_URL,
  GEOCODE_API_URL,
  GEOCODE_API_BY_IP_URL,
} from "./config.js";

export const currentDate = function () {
  const now = new Date();
  const day = `${now.getDate()}`.padStart(2, 0);
  const month = `${now.getMonth() + 1}`.padStart(2, 0);
  const year = `${now.getFullYear()}`;
  const hour = `${now.getHours()}`.padStart(2, 0);
  const minute = `${now.getMinutes()}`.padStart(2, 0);
  return ` ${day}/${month}/${year}, ${hour}:${minute}`;
};
export const stateDaily = {
  lng: "",
  lat: "",
  continent: "",
  country: "",
  city: "",
  localTime: "",
  timezone: "",
  temperature: "",
  weatherCode: "",
  dayTemp: "",
  nightTemp: "",
  feels: "",
  sunrise: "",
  sunset: "",
  pressure: "",
  humidity: "",
  cloudCover: "",
  windGust: "",
  windSpeed: "",
  windDirection: "",
};

export const stateWeekly ={
  country: "",
  city: "",
  date: "",
  weatherCode: "",
  dayTemp: "",
  nightTemp: "",
  dayTempFeel: "",
  nightTempFeel: "",
  rainyHours: "",
  solarRadiation: "",
  cloudCover: "",
  windGust: "",
  windSpeed: "",
  windDirection: "",
}

// funtion for spliting array into smaller pieces
Object.defineProperty(Array.prototype, "chunk", {
  value: function (chunkSize) {
    let R = [];
    for (let i = 0; i < this.length; i += chunkSize)
      R.push(this.slice(i, i + chunkSize));
    return R;
  },
});

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
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

const getJSON = function (url, errorMsg = "Something went wrong!!!") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};
export const wheatherForecast = async function () {
  try {
    const dataIP = await geocodingAPIbyIP();
    // daily data
    stateDaily.country = dataIP.country.isoName;
    stateDaily.city = dataIP.location.city;
    stateDaily.lng = dataIP.location.longitude;
    stateDaily.lat = dataIP.location.latitude;
    stateDaily.localTime = +dataIP.location.timeZone.localTime.slice(11, 13);
    stateDaily.timezone = dataIP.location.timeZone.ianaTimeId;
    stateDaily.continent = dataIP.location.timeZone.ianaTimeId.split("/")[0];
    // weekly data
    stateWeekly.country = dataIP.country.isoName;
    stateWeekly.city = dataIP.location.city;

    const wheatherDaily = await WHEATHER_DAILY_API_URL(
      stateDaily.lat,
      stateDaily.lng,
      stateDaily.continent,
      stateDaily.city
    );
    const wheatherHourly = await WHEATHER_HOURLY_API_URL(
      stateDaily.lat,
      stateDaily.lng
    );
    const data = await Promise.all([
      getJSON(wheatherDaily),
      getJSON(wheatherHourly),
    ]);
    console.log(data);
    // daily data
    stateDaily.dayTemp = Math.round(data[0].daily.temperature_2m_max[0]);
    stateDaily.nightTemp = Math.trunc(data[0].daily.temperature_2m_min[0]);
    stateDaily.sunrise = data[0].daily.sunrise[0].slice(11);
    stateDaily.sunset = data[0].daily.sunset[0].slice(11);
    stateDaily.feels = Math.round(
      data[1].hourly.apparent_temperature[stateDaily.localTime - 1]
    );
    stateDaily.cloudCover = data[1].hourly.cloudcover[stateDaily.localTime - 1];
    stateDaily.pressure = data[1].hourly.pressure_msl[stateDaily.localTime - 1];
    stateDaily.humidity =
      data[1].hourly.relativehumidity_2m[stateDaily.localTime - 1];
    stateDaily.temperature = Math.round(
      data[1].hourly.temperature_2m[stateDaily.localTime - 1]
    );
    stateDaily.weatherCode =
      data[1].hourly.weathercode[stateDaily.localTime - 1];
    stateDaily.windDirection =
      data[1].hourly.winddirection_10m[stateDaily.localTime - 1];
    stateDaily.windGust =
      data[1].hourly.windgusts_10m[stateDaily.localTime - 1];
    stateDaily.windSpeed =
      data[1].hourly.windspeed_10m[stateDaily.localTime - 1];
  
  // weekly data
  stateWeekly.date = data[0].daily.time;
  stateWeekly.weatherCode = data[0].daily.weathercode;
  stateWeekly.dayTemp = data[0].daily.temperature_2m_min;
  stateWeekly.nightTemp = data[0].daily.temperature_2m_max;
  stateWeekly.dayTempFeel = data[0].daily.apparent_temperature_min;
  stateWeekly.nightTempFeel = data[0].daily.apparent_temperature_max;
  stateWeekly.rainyHours = data[0].daily.precipitation_hours;
  stateWeekly.solarRadiation = data[0].daily.shortwave_radiation_sum;
  stateWeekly.cloudCover = data[1].hourly.cloudcover.chunk(24).map(a => a.reduce((ac,x )=> ac +( Math.trunc(x/24)), 0));
  stateWeekly.windGust = data[0].daily.windgusts_10m_max;
  stateWeekly.windSpeed = data[0].daily.windspeed_10m_max;
  stateWeekly.windDirection = data[0].daily.winddirection_10m_dominant;
  console.log(stateWeekly);
  } catch (err) {
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

