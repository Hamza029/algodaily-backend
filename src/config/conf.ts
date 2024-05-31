import dotenv from 'dotenv';
import path from 'path';

const envPath = path.join(__dirname + '/../../.env');
dotenv.config({ path: envPath });

export const conf = {
    PORT: process.env.PORT,
    DATA_API_DB_NAME: process.env.DATA_API_DB_NAME,
    DATA_API_DB_SERVICE_HOST: process.env.DATA_API_DB_SERVICE_HOST,
    DATA_API_DB_USER: process.env.DATA_API_DB_USER,
    DATA_API_DB_PORT: process.env.DATA_API_DB_PORT,
    DATA_API_DB_PASSWORD: process.env.DATA_API_DB_PASSWORD,
    DATA_API_DB_CLIENT: process.env.DATA_API_DB_CLIENT,
    NODE_ENV: process.env.NODE_ENV
};
