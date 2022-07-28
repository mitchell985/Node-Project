import { Request, Response } from "express";
import { findWeather } from "../service/weather.service";

export async function getCityWeatherHandler(req: Request, res: Response) {
    //console.log("Res Locals: \n", res.locals);
    //console.log("Req Params: \n", req.params);
    //console.log("Query: ", req.query);

    const city = String(req.query.cityName);

    const weather = await findWeather(city);

    res.send(weather);
}