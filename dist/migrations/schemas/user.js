"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema = (table) => {
    table.increments('Id').primary().unsigned().unique();
    table.string('Username').notNullable().unique();
    table.string('Email').notNullable().unique();
    table.string('Password').notNullable();
};
exports.default = userSchema;
