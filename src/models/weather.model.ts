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

// An example script for redirecting users from USA to https://google.com/
// and users from Canada to https://google.ca/

// ip-api endpoint URL
// we need only the countryCode, but you can request more fields
// see http://ip-api.com/docs/api:json for documentation
// var endpoint = 'http://ip-api.com/json/?fields=status,message,countryCode';

// var xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function() {
// 	if (this.readyState == 4 && this.status == 200) {
// 		var response = JSON.parse(this.responseText);
// 		if(response.status !== 'success') {
// 			console.log('query failed: ' + response.message);
// 			return
// 		}
// 		// Redirect
// 		if(response.countryCode == "US") {
// 			window.location.replace("https://google.com/");
// 		}
// 		if(response.countryCode == "CA") {
// 			window.location.replace("https://google.ca/");
// 		}
// 	}
// };
// xhr.open('GET', endpoint, true);
// xhr.send();
// // An example script for finding out the distance from the user to multiple points

// // Coordinates and name
// var coords = [
// 	{lat: 40.7127837, lon: -74.0059413, name: 'New York, NY'},
// 	{lat: 34.0522342, lon: -118.2436849, name: 'Los Angeles, CA'},
// 	{lat: 37.3382082, lon: -121.8863286, name: 'San Jose, CA'},
// 	{lat: 41.8781136, lon: -87.6297982, name: 'Chicago, IL'},
// 	{lat: 47.6062095, lon: -122.3320708, name: 'Seattle, WA'},
// 	];

// // ip-api endpoint URL
// // see http://ip-api.com/docs/api:json for documentation
// var endpoint = 'http://ip-api.com/json/?fields=status,message,lat,lon';

// function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
// 	var R = 6371; // Radius of the earth in km
// 	var dLat = deg2rad(lat2-lat1);  // deg2rad below
// 	var dLon = deg2rad(lon2-lon1); 
// 	var a = 
// 		Math.sin(dLat/2) * Math.sin(dLat/2) +
// 		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
// 		Math.sin(dLon/2) * Math.sin(dLon/2); 
// 	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
// 	var d = R * c; // Distance in km
// 	return d;
// }

// function deg2rad(deg) {
// 	return deg * (Math.PI/180)
// }

// var xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function() {
// 	if(this.readyState == 4 && this.status == 200) {
// 		var response = JSON.parse(this.responseText);
// 		if(response.status !== 'success') {
// 			console.log('query failed: ' + response.message);
// 			return
// 		}
// 		// Distance in kilometers for each coordinate
// 		for(var i = 0; i < coords.length; i++) {
// 			var diff = getDistanceFromLatLonInKm(coords[i].lat, coords[i].lon, response.lat, response.lon);
// 			console.log('distance to ' + coords[i].name + ': ' + diff + 'km');
// 		}
// 	}
// };
// xhr.open('GET', endpoint, true);
// xhr.send();