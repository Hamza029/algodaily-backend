"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./../config/knexfile"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envPath = path_1.default.join(__dirname + '/../../.env');
dotenv_1.default.config({ path: envPath });
const NODE_ENV = process.env.NODE_ENV || 'development';
const db = (0, knex_1.default)(knexfile_1.default[NODE_ENV]);
exports.default = db;
