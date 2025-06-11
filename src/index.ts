import express from "express";
import { PORT } from "./config";

const app = express();

app.get("/" , (req , res) => {
    res.send("Started With Ausphora Backend!!");
})

app.listen(PORT , () => {
    console.log(`Backend is up: http://localhost:${PORT}`);
})