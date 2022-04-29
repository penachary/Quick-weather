import { WHEATHER_DAILY_API_URL, WHEATHER_HOURLY_API_URL, GEOCODE_API_URL } from "./config.js";

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
        const {latitude: lat, longitude: lng} = pos.coords;
        const wheatherDaily = WHEATHER_DAILY_API_URL(lat, lng, "Europe", "Istanbul");
        const wheatherHourly = WHEATHER_HOURLY_API_URL(lat, lng);
        const data = await Promise.all([getJSON(wheatherDaily), getJSON(wheatherHourly)]);
         console.log(data);
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