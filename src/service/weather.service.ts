import axios from "axios";
import config from "config";

/**
 *
 * Takes a city name and returns an object of the cities for that location
 * @param city location
 * @returns geolocation of that city
 */
async function geocodingCity(city: string) {
  const apiKey = config.get<string>("apiKey");
  try {
    const cityLocation = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`
    );
    return cityLocation.data.results[0].geometry.location;
  } catch (error) {
    console.log(error);
  }
  return null;
}

/**
 * get the weather for a weather api
 * @param city where you want the weather to come from
 * @returns the weather as a json return (may return multiple cities)
 */
export async function findWeather(city: string) {
  const cityLocation = await geocodingCity(city);
  console.log(cityLocation)

  try {
    const weather = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${cityLocation.lat}&longitude=${cityLocation.lng}&current_weather=true`
    );

    return weather.data;
  } catch (error) {
    console.log(error);
  }
}
