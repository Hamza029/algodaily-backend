import { Knex } from 'knex';
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.join(__dirname + '/../../.env');
dotenv.config({ path: envPath });

const envs: Record<string, Knex.Config> = {
    development: {
        client: 'mysql2',
        connection: {
            database: process.env.DATA_API_DB_NAME || 'TestDB',
            host: process.env.DATA_API_DB_SERVICE_HOST || 'localhost',
            // port: parseInt(process.env.DATA_API_DB_SERVICE_PORT),
            port: Number(process.env.DATA_API_DB_PORT) || 3306,
            user: process.env.DATA_API_DB_USER || 'root',
            password: process.env.DATA_API_DB_PASSWORD || 'mypass',
        },
        migrations: {
            tableName: 'knex_migrations',
            extension: 'ts',
            directory: './../migrations/',
        },
        debug: true,
    },
};

// console.dir(envPath);
console.log(envs['development']);

export default envs;
