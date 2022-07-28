import axios from "axios";

export async function findWeather(city: string) {
  try {
    const weather = await axios.get(
      "https://api.open-meteo.com/v1/forecast?latitude=-36&longitude=174.7762&current_weather=true"
    );
    console.log(weather.data);
    return weather.data;
  } catch (error) {
    console.log(error);
  }
}
