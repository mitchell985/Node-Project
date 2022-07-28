/**
 * Takes http routes and forwards to a controller
 */
import { Express, Request, Response } from "express"
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controller/product.controller";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import { getCityWeatherHandler } from "./controller/weather.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./schema/product.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express){
    //GET routes
    app.get("/", (req: Request, res: Response) => res.send("Nothing to see here 😄"));
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
    app.get('/api/sessions', requireUser, getUserSessionsHandler);
    app.get('/api/products/:productId', validateResource(getProductSchema), getProductHandler);
    //app.get('/api/weather/:city', validateCity(getProductSchema), getCityWeatherHandler);
    app.get('/api/weather/:city', getCityWeatherHandler);

    //POST routes
    app.post('/api/users', validateResource(createUserSchema), createUserHandler);
    app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler);
    app.post('/api/products', [requireUser, validateResource(createProductSchema)], createProductHandler);

    //PUT routes
    app.put('/api/products/:productId', [requireUser, validateResource(updateProductSchema)], updateProductHandler);

    //DELETE routes
    app.delete('/api/sessions', requireUser, deleteSessionHandler);
    app.delete('/api/products/:productId', [requireUser, validateResource(deleteProductSchema)], deleteProductHandler);
}

export default routes