import config from 'config';
import connect from './utils/connect'
import logger from './utils/logger'
import createServer from "./utils/server";

const port = config.get<number>('port');

const app = createServer();

//May move this to server.ts too...
app.listen(port, async () => {
    logger.info(`App running on http://localhost:${port}`);

    await connect();
});