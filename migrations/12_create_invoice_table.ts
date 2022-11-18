import { Knex as _Knex } from 'knex';

export async function up(knex: _Knex): Promise<void> {
  return knex.schema
    .createTable('invoice', (table: any) => {
      table.increments('id').primary().notNull();
      table.string('filename').notNull();
      table.integer('user_id').references('users.id').notNull();
      table.integer('sales_id').references('sales.id').notNull().unique();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: _Knex): Promise<void> {
  return knex.schema.dropTable('invoice');
}
