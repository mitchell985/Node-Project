/**
 * Weather Document to return
 * TODO: work out how the function works...
 */
export interface WeatherDocument {
  city: CityLocation;
  temperature: number;
  windspeed: number;
  distanceToLocation: number;
  weatherPhrase: string;
  // interpretWeatherCode(weatherCode: number): Promise<string>;
}

export interface CityLocation {
  cityName: string;
  latitude: number;
  longitude: number;
}

interface IWeatherCode<T> {
  [id: string]: T;
}

/**
 * Weather code information
 */
const WeatherCodes: IWeatherCode<string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight showers",
  81: "Moderate showers",
  82: "Violent showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Slight to moderate thunderstorms",
  96: "Thunderstorm with light hail",
  99: "Thunderstorm with heavy hail",
}

export function getWeatherPhrase(weatherCode: number): string {
  const weatherPhrase = WeatherCodes[weatherCode];
  if (weatherPhrase){
    return weatherPhrase;
  }

  return String(weatherCode);
}

