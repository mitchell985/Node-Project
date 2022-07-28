/**
 * Weather Document to return
 * TODO: work out how the function works...
 */
export interface WeatherDocument {
  city: CityLocation;
  temperature: number;
  windspeed: number;
  weatherPhrase: string;
  // interpretWeatherCode(weatherCode: number): Promise<string>;
}

export interface CityLocation {
  cityName: string;
  latitude: number;
  longitude: number;
}

/**
 * Interprets a weather code to a phrase
 *
 * TODO: This code stinks remove the switch statement
 * @param weatherCode to convert to a weather phrase
 * @returns A weather phrase from the weather code
 */
export async function interpretWeatherCode(weatherCode: number) {
  let weatherPhrase = String(weatherCode);

  switch (weatherCode) {
    case 0:
        weatherPhrase = "Clear sky"
      break;
    case 1:
        weatherPhrase = "Mainly clear"
      break;
    case 2:
        weatherPhrase = "Overcast"
      break;
    case 3:
        weatherPhrase = "Fog"
      break;
    case 45:
        weatherPhrase = "Partly cloudy"
      break;
    case 48:
        weatherPhrase = "Depositing rime fog"
      break;
    case 51:
        weatherPhrase = "Light drizzle"
      break;
    case 53:
        weatherPhrase = "Moderate drizzle"
      break;
    case 55:
        weatherPhrase = "Dense drizzle"
      break;
    case 56:
        weatherPhrase = "Light freezing drizzle"
      break;
    case 57:
        weatherPhrase = "Dense freezing drizzle"
      break;
    case 61:
        weatherPhrase = "Slight rain"
      break;
    case 63:
        weatherPhrase = "Moderate rain"
      break;
    case 65:
        weatherPhrase = "Heavy rain"
      break;
    case 66:
        weatherPhrase = "Light freezing rain"
      break;
    case 67:
        weatherPhrase = "Heavy freezing rain"
      break;
    case 71:
        weatherPhrase = "Slight snow fall"
      break;
    case 73:
        weatherPhrase = "Moderate snow fall"
      break;
    case 75:
        weatherPhrase = "Heavy snow fall"
      break;
    case 77:
        weatherPhrase = "Snow grains"
      break;
    case 80:
        weatherPhrase = "Slight showers"
      break;
    case 81:
        weatherPhrase = "Moderate showers"
      break;
    case 82:
        weatherPhrase = "Violent showers"
      break;
    case 85:
        weatherPhrase = "Slight snow showers"
      break;
    case 86:
        weatherPhrase = "Heavy snow showers"
      break;
    case 95:
        weatherPhrase = "Slight to moderate thunderstorms"
      break;
    case 96:
        weatherPhrase = "Thunderstorm with light hail"
      break;
    case 99:
        weatherPhrase = "Thunderstorm with heavy hail"
      break;
  }

  return weatherPhrase;
}

/**
 * Weather interpretation codes
 * @param weatherCode to convert to a string
 * @returns a string created from the weather code
 */
// async function interpretWeatherCode(weatherCode: number){
//     const weatherCodes = {
//         0: "Clear sky",
//         1: "Mainly clear",
//         2: "Partly cloudy",
//         3: "Overcast",
//         45: "Fog",
//         48: "Depositing rime fog",
//         51: "Light drizzle",
//         53: "Moderate drizzle",
//         55: "Dense drizzle",
//         56: "Light freezing drizzle",
//         57: "Dense freezing drizzle",
//         61: "Slight rain",
//         63: "Moderate rain",
//         65: "Heavy rain",
//         66: "Light freezing rain",
//         67: "Heavy freezing rain",
//         71: "Slight snow fall",
//         73: "Moderate snow fall",
//         75: "Heavy snow fall",
//         77: "Snow grains",
//         80: "Slight showers",
//         81: "Moderate showers",
//         82: "Violent showers",
//         85: "Slight snow showers",
//         86: "Heavy snow showers",
//         95: "Slight to moderate thunderstorms",
//         96: "Thunderstorm with light hail",
//         99: "Thunderstorm with heavy hail",
//     }

//     return weatherCodes[weatherCode];
// }

// const switchCase = (obj: Object, defaultValue = "_default") => (value: Number) => {
//     return obj[value] || defaultValue
// }

// const weatherCodes = {
//   0: "Clear sky",
//   1: "Mainly clear",
//   2: "Partly cloudy",
//   3: "Overcast",
//   45: "Fog",
//   48: "Depositing rime fog",
//   51: "Light drizzle",
//   53: "Moderate drizzle",
//   55: "Dense drizzle",
//   56: "Light freezing drizzle",
//   57: "Dense freezing drizzle",
//   61: "Slight rain",
//   63: "Moderate rain",
//   65: "Heavy rain",
//   66: "Light freezing rain",
//   67: "Heavy freezing rain",
//   71: "Slight snow fall",
//   73: "Moderate snow fall",
//   75: "Heavy snow fall",
//   77: "Snow grains",
//   80: "Slight showers",
//   81: "Moderate showers",
//   82: "Violent showers",
//   85: "Slight snow showers",
//   86: "Heavy snow showers",
//   95: "Slight to moderate thunderstorms",
//   96: "Thunderstorm with light hail",
//   99: "Thunderstorm with heavy hail",
// };
