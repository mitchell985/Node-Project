import express from "express";
import config from 'config';
import connect from './utils/connect'

const port = config.get<number>('port');

export const app = express();

app.get("/", (req, res) => {
    res.send("Nothing to see here 😄")
})

app.listen(port, async () => {
    console.log(`App running on http://localhost:${port}`);

    await connect();
});