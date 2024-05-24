"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authSchema = (table) => {
    table.increments('Id').primary().unsigned().unique();
    table.string('Username').notNullable();
    table.string('Name').notNullable();
    table.string('Email').notNullable();
    table.date('JoinDate').notNullable();
    table.integer('Role').notNullable();
};
exports.default = authSchema;
