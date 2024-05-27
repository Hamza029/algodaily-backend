import dotenv from 'dotenv';
import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';

import userRoute from './routes/userRoute';

const envPath = path.join(__dirname + '/../.env');
dotenv.config({ path: envPath });

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: 'fail',
        message: err.message,
    });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
