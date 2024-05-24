import knex, { Knex } from 'knex';
import knexFile from './../config/knexfile';
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.join(__dirname + '/../../.env');
dotenv.config({ path: envPath });

const NODE_ENV = process.env.NODE_ENV || 'development';

const db: Knex.Config = knex(knexFile[NODE_ENV]);

export default db;
