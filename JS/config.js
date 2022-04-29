export const WHEATHER_DAILY_API_URL = function(lat, lng, continent, city){
   return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum&timezone=${continent}%2F${city}`
}
export const WHEATHER_HOURLY_API_URL = function(lat, lng){
    return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,pressure_msl,weathercode,cloudcover,windspeed_10m,winddirection_10m,windgusts_10m,soil_temperature_6cm,soil_moisture_3_9cm`
}
export const GEOCODE_API_URL = function(city){
    return `http://api.positionstack.com/v1/forward?access_key=1ecc74fc50e4b04c284b0b718ca84c6d&query=${city}`
}