import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import db from './db/db';
import { UserType, AuthType } from './interfaces';
import path from 'path';

const envPath = path.join(__dirname + '/../../.env');
dotenv.config({ path: envPath });

const app: Express = express();
const port = process.env.PORT || 3000;

const getUserWithId1 = async () => {
    try {
        const val = await db<UserType>('User').where('id', 1).first();
        if (val) {
            console.log(val.Username, val.Email);
        } else {
            throw new Error("Requested user doesn't exist");
        }
    } catch (err) {
        console.log(err);
    }
};

getUserWithId1();

app.get('/', (req: Request, res: Response) => {
    res.send('all working');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
