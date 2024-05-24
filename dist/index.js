"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db/db"));
const path_1 = __importDefault(require("path"));
const envPath = path_1.default.join(__dirname + '/../../.env');
dotenv_1.default.config({ path: envPath });
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const getUserWithId1 = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const val = yield (0, db_1.default)('User').where('id', 1).first();
        if (val) {
            console.log(val.Username, val.Email);
        }
        else {
            throw new Error("Requested user doesn't exist");
        }
    }
    catch (err) {
        console.log(err);
    }
});
getUserWithId1();
app.get('/', (req, res) => {
    res.send('all working');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
