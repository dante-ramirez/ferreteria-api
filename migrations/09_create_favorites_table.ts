import { Knex as _Knex } from 'knex';

export async function up(knex: _Knex): Promise<void> {
  return knex.schema
    .createTable('favorites', (table: any) => {
      table.increments('id').primary().notNull();
      table.integer('user_id').references('users.id').notNull();
      table.integer('product_id').references('products.id').notNull();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: _Knex): Promise<void> {
  return knex.schema.dropTable('favorites');
}
