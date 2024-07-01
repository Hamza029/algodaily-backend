import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Blog', (table: Knex.CreateTableBuilder) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.string('authorUsername').notNullable();

    table
      .foreign('authorUsername')
      .references('username')
      .inTable('User')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Blog');
}
