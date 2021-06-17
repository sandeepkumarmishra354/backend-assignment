import { config } from 'dotenv';
import express from 'express';
import route from './api/route';
import { Database } from './database/database';

//call this function before using process.env
config();

const database = new Database();
const app = express();

database
    .init()
    .then(() => {
        console.log("database connected...");
        app.use(route);
        app.listen(process.env.PORT, () => {
            console.log(`running on port: ${process.env.PORT}...`);
        });
    })
    .catch(err => {
        console.error(err);
        process.exit(0);
    });

export { app, database };