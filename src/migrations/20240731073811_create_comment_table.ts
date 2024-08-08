import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Comment', (table: Knex.CreateTableBuilder) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('userId').notNullable();
    table.uuid('blogId').notNullable();
    table.text('content').notNullable();
    table.dateTime('createdAt').notNullable();

    table
      .foreign('userId')
      .references('Id')
      .inTable('User')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table
      .foreign('blogId')
      .references('id')
      .inTable('Blog')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Comment');
}
