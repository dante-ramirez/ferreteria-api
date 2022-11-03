import { Knex as _Knex } from 'knex';

export async function up(knex: _Knex): Promise<void> {
  return knex.schema
    .createTable('products', (table: any) => {
      table.increments('id').primary().notNull();
      table.string('name').notNull();
      table.string('details').notNull();
      table.integer('stock').notNull();
      table.string('code').notNull();
      table.float('price').notNull();
      table.float('final_price').notNull();
      table.float('reward_points').notNull();
      table.string('model').notNull();
      table.string('image1');
      table.string('image2');
      table.string('image3');
      table.string('image4');
      table.integer('department_id').references('department.id').notNull();
      table.integer('category_id').references('category.id').notNull();
      table.integer('brand_id').references('brand.id').notNull();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: _Knex): Promise<void> {
  return knex.schema.dropTable('products');
}
