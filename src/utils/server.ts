import config from "config";
import express from "express";
import deserializeUser from "../middleware/deserializeUser";
import routes from "../routes";
import connect from "./connect";
import logger from "./logger";

const port = config.get<number>("port");

function createServer() {
  const app = express();

  app.use(express.json());

  app.use(deserializeUser);

  routes(app);

  //May move this to server.ts too...
  app.listen(port, async () => {
    logger.info(`App running on http://localhost:${port}`);

    await connect();
  });

  return app;
}

export default createServer;
