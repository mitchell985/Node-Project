import axios from "axios";
import config from "config";
import {
  CityLocation,
  getWeatherPhrase,
  WeatherDocument,
} from "../models/weather.model";
import logger from "../utils/logger";

/**
 * Works out how far one gps location is from another.
 * @param lat1 
 * @param lon1 
 * @param lat2 
 * @param lon2 
 * @returns distance the locations are in kilometers.
 */
function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return Math.round(d);
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

async function getDistance(cityLocation: CityLocation): Promise<number> {
  try {
    const currentLocation = await axios.get( //get the location of the current public ip
      `http://ip-api.com/json/?fields=57536`
    );
    const distance = getDistanceFromLatLonInKm(
      currentLocation.data.lat,
      currentLocation.data.lon,
      cityLocation.latitude,
      cityLocation.longitude
    );
    return distance;
  } catch (e) {
    logger.error(e);
    throw new Error("Couldn't get distance between locations");
  }
}

/**
 * Takes a city name and returns an object with that cities location
 * @param city location
 * @returns geolocation of that city as a CityLocation
 */
async function getCityGeocoding(city: string): Promise<CityLocation> {
  const apiKey = config.get<string>("apiKey");
  try {
    const cityLocation = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`
    );
    return {
      cityName: cityLocation.data.results[0].formatted_address,
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
 * @returns The completed WeatherDocument
 */
async function getWeather(
  cityLocation: CityLocation,
  distance: number
): Promise<WeatherDocument> {
  try {
    const weather = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${cityLocation.latitude}&longitude=${cityLocation.longitude}&current_weather=true`
    );
    return {
      city: cityLocation,
      temperature: weather.data.current_weather.temperature,
      windspeed: weather.data.current_weather.windspeed,
      distanceToLocation: distance,
      weatherPhrase: getWeatherPhrase(weather.data.current_weather.weathercode),
    };
  } catch (e) {
    logger.error(e);
    throw new Error("Invalid City Location");
  }
}

/**
 * get the weather for a weather api
 * @param city where you want the weather to come from
 * @returns the weather as a json return (may return multiple cities)
 */
export async function findWeather(city: string): Promise<WeatherDocument> {
  const cityLocation = await getCityGeocoding(city);
  const distance = await getDistance(cityLocation);

  return await getWeather(cityLocation, distance);
}
