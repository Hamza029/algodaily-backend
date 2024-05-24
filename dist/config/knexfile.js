"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envPath = path_1.default.join(__dirname + '/../../.env');
dotenv_1.default.config({ path: envPath });
const envs = {
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
// console.log(envs['development']);
exports.default = envs;
