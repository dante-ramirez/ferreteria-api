import { Knex as _Knex } from 'knex';

export async function up(knex: _Knex): Promise<void> {
  return knex.schema
    .createTable('users', (table: any) => {
      table.increments('id').primary().notNull();
      table.string('name').notNull();
      table.string('last_name').notNull();
      table.string('email').unique().notNull();
      table.string('password').notNull();
      table.string('role').notNull();
      table.boolean('verified').notNull().defaultTo(false);
      table.boolean('suspended').notNull().defaultTo(false);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: _Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
