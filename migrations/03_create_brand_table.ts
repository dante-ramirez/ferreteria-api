import { Knex as _Knex } from 'knex';

export async function up(knex: _Knex): Promise<void> {
  return knex.schema
    .createTable('brand', (table: any) => {
      table.increments('id').primary().notNull();
      table.string('name').notNull();
      table.integer('offers_id').references('offers.id').notNull();
      table.timestamp('begin_at').defaultTo(knex.fn.now());
      table.timestamp('finish_at').defaultTo(knex.fn.now());
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: _Knex): Promise<void> {
  return knex.schema.dropTable('brand');
}
