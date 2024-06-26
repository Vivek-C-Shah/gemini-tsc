import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import { getResponse } from "./genResponse";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
})

app.post('/chat', async (req, res) => {
    const msg = req.body.message;
    const response = await getResponse(msg);
    res.json({ response });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});