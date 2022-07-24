import express from "express";

export const app = express();

app.get("/", (req, res) => {
    res.send("Nothing to see here 😄")
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

//hello world