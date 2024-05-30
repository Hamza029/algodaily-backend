import dotenv from 'dotenv';
import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';

import userRoute from './routes/userRoute';
import authRoute from './routes/authRoute';

const envPath: string = path.join(__dirname + '/../.env');
dotenv.config({ path: envPath });

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use('/api/users', userRoute);

app.use('/api/auth', authRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 'fail',
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
