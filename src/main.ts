import {config} from 'dotenv';
import express from 'express';
import route from './api/route';

//call this function before using process.env
config();

const app = express();

app.use(route);

app.listen(process.env.PORT, () => {
    console.log(`running on port: ${process.env.PORT}...`);
});

export { app };