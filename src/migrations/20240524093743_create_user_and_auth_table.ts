import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('User', (table: Knex.CreateTableBuilder) => {
    table.uuid('Id').primary().defaultTo(knex.fn.uuid());
    table.string('Username').notNullable().unique();
    table.string('Email').notNullable().unique();
    table.string('Name').notNullable();
    table.dateTime('JoinDate').notNullable();
    table.integer('Role').notNullable();
  });

  await knex.schema.createTable('Auth', (table: Knex.CreateTableBuilder) => {
    table.uuid('Id').primary().defaultTo(knex.fn.uuid());
    table.string('Username').notNullable().unique();
    table.string('Password').notNullable();
    table.dateTime('PasswordModifiedAt').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('User');
  await knex.schema.dropTableIfExists('Auth');
}
