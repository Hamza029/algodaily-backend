import express, { Express, Request, Response, NextFunction } from 'express';

import userRoute from './routes/userRoute';
import authRoute from './routes/authRoute';
import { conf } from './config/conf';

const app: Express = express();
const port: number = Number(conf.PORT) || 3500;

app.use(express.json({ limit: '50kb' }));

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
