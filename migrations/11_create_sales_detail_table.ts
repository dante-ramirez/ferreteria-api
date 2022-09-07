import { Knex as _Knex } from 'knex';

export async function up(knex: _Knex): Promise<void> {
  return knex.schema
    .createTable('sale_detail', (table: any) => {
      table.increments('id').primary().notNull();
      table.integer('sales_id').references('sales.id').notNull();
      table.integer('product_id').references('products.id').notNull();
      table.float('sale_price').notNull();
      table.integer('quantity').defaultTo(-1);
      table.float('amount').notNull();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: _Knex): Promise<void> {
  return knex.schema.dropTable('sale_detail');
}
