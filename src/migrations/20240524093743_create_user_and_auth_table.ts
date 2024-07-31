import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('User', (table: Knex.CreateTableBuilder) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('name').notNullable();
    table.dateTime('joinDate').notNullable();
    table.integer('role').notNullable();
  });

  await knex.schema.createTable('Auth', (table: Knex.CreateTableBuilder) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
    table.dateTime('passwordModifiedAt').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('User');
  await knex.schema.dropTableIfExists('Auth');
}
