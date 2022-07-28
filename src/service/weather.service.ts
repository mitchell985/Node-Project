import axios from "axios";
import config from "config";
import { CityLocation, interpretWeatherCode, WeatherDocument } from "../models/weather.model";
import logger from "../utils/logger";

/**
 *
 * Takes a city name and returns an object with that cities location
 * @param city location
 * @returns geolocation of that city as a CityLocation
 */
async function fetchCityGeocoding(city:string):Promise<CityLocation> {
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
  } catch (e) {
    logger.error(e);
    throw new Error("City not found");
  }
}

/**
 * Gets weather at a gps location
 * @param cityLocation 
 * @returns The WeatherDocument
 */
async function getWeather(cityLocation: CityLocation):Promise<WeatherDocument> {
  try {
    const weather = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${cityLocation.latitude}&longitude=${cityLocation.longitude}&current_weather=true`
    );
    return {
      city: cityLocation,
      temperature: weather.data.current_weather.temperature,
      windspeed: weather.data.current_weather.windspeed,
      weatherPhrase: await interpretWeatherCode(weather.data.current_weather.weathercode)
    }
  } catch (e) {
    logger.error(e);
    throw new Error("Invaild City Location");
  }
}

/**
 * get the weather for a weather api
 * @param city where you want the weather to come from
 * @returns the weather as a json return (may return multiple cities)
 */
export async function findWeather(city: string):Promise<WeatherDocument> {
  const cityLocation = await fetchCityGeocoding(city);
  //const weatherInfo = await getWeather(cityLocation);
  return await getWeather(cityLocation);
}
