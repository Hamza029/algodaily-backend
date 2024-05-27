import { Knex } from 'knex';

const userSchema = (table: Knex.CreateTableBuilder) => {
    table.increments('Id').primary().unsigned().unique();
    table.string('Username').notNullable().unique();
    table.string('Email').notNullable().unique();
    table.string('Password').notNullable();
};

export default userSchema;
