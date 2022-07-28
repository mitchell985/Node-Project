import { Request, Response } from "express";
import { findWeather } from "../service/weather.service";

export async function getCityWeatherHandler(req: Request, res: Response) {
    try{
        const weather = await findWeather(String(req.query.cityName));
        return res.send(weather);
    }
    catch(e){
        return res.status(400).send("City couldn't be found");
    }
}