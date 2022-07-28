import { Request, Response } from "express";

export async function getCityWeatherHandler(req: Request, res: Response) {
    console.log("Res Locals: \n", res.locals);
    console.log("Req Params: \n", req.params);

    res.send(req.params.city);
}