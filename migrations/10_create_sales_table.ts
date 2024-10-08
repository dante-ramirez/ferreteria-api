import { Knex as _Knex } from 'knex';

export async function up(knex: _Knex): Promise<void> {
  return knex.schema
    .createTable('sales', (table: any) => {
      table.increments('id').primary().notNull();
      table.integer('user_id').references('users.id').notNull();
      table.string('code').notNull();
      table.date('date').notNull();
      table.float('subtotal').notNull();
      table.float('discount_points').notNull();
      table.float('total').notNull();
      table.string('status').notNull();
      table.boolean('request').notNull().defaultTo(false);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: _Knex): Promise<void> {
  return knex.schema.dropTable('sales');
}
