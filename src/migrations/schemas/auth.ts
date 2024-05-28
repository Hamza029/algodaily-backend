import { Knex } from 'knex';

const authSchema = (table: Knex.CreateTableBuilder) => {
    table.increments('Id').primary().unsigned().unique();
    table.string('Username').notNullable().unique();
    table.string('Password').notNullable();
};

export default authSchema;
