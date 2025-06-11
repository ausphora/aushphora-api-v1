import express from 'express';
import cors from 'cors';
import { PORT } from './config';
import { UserRouter } from './routes/userRoutes';

const app = express();

app.use(express.json());

const corsOptions = {
    origin: [
        'http://localhost:3000'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use("/api/v1/auth/user", UserRouter);


app.get("/", (req, res) => {
    res.send(`
        <h1 style="text-align: center;">Ausphora's Server is up and running!!</h1>
    `)
})

app.listen(PORT, () => {
    console.log(`BACKEND IS HOSTED : http://localhost:${PORT}`)
});