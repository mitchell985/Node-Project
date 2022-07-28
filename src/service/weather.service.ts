import axios from "axios";
import config from "config";
import { CityLocation, interpretWeatherCode } from "../models/weather.model";
import logger from "../utils/logger";

/**
 *
 * Takes a city name and returns an object of the cities for that location
 * @param city location
 * @returns geolocation of that city
 */
async function fetchCityGeocoding<CityLocation>(city:string) {
  const apiKey = config.get<string>("apiKey");
  try {
    const cityLocation = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`
    );
    return {
      cityName: city,
      latitude: cityLocation.data.results[0].geometry.location.lat,
      longitude: cityLocation.data.results[0].geometry.location.lng,
    };
    //return <CityLocation>
  } catch (e) {
    logger.error(e);
    return e;
  }
}

async function getWeather(cityLocation: CityLocation) {
  try {
    const weather = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${cityLocation.latitude}&longitude=${cityLocation.longitude}&current_weather=true`
    );
    return {
      city: cityLocation,
      temperature: weather.data.current_weather.temperature,
      windspeed: weather.data.current_weather.windspeed,
      weatherPhrase: interpretWeatherCode(weather.data.current_weather.weatherCode)
    }
  } catch (e) {
    logger.error(e);
    return null;
  }
}

/**
 * get the weather for a weather api
 * @param city where you want the weather to come from
 * @returns the weather as a json return (may return multiple cities)
 */
export async function findWeather(city: string) {
  //const cityLocation = await fetchCityGeocoding(city);
  //const weatherInfo = await getWeather(cityLocation)
}
