import { Knex } from 'knex';

const authSchema = (table: Knex.CreateTableBuilder) => {
    table.increments('Id').primary().unsigned().unique();
    table.string('Username').notNullable();
    table.string('Name').notNullable();
    table.string('Email').notNullable();
    table.date('JoinDate').notNullable();
    table.integer('Role').notNullable();
};

export default authSchema;
