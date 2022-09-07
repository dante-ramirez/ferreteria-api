import { Knex as _Knex } from 'knex';

export async function up(knex: _Knex): Promise<void> {
  return knex.schema
    .createTable('wallet', (table: any) => {
      table.increments('id').primary().notNull();
      table.integer('user_id').references('users.id').notNull();
      table.float('points').defaultTo(-1);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: _Knex): Promise<void> {
  return knex.schema.dropTable('wallet');
}
