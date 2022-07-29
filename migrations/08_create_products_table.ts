import { Knex as _Knex } from 'knex';

export async function up(knex: _Knex): Promise<void> {
  return knex.schema
    .createTable('products', (table: any) => {
      table.increments('id').primary().notNull();
      table.string('name').notNull();
      table.string('description').notNull();
      table.integer('stock').notNull();
      table.float('price').notNull();
      table.string('code').notNull();
      table.float('discount').notNull();
      table.float('reward_points').notNull();
      table.string('model').notNull();
      table.string('path_image1');
      table.string('path_image2');
      table.string('path_image3');
      table.string('path_image4');
      table.integer('department_id').references('department.id').notNull();
      table.integer('category_id').references('category.id').notNull();
      table.integer('brand_id').references('brand.id').notNull();
      table.integer('offers_id').references('offers.id').notNull();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: _Knex): Promise<void> {
  return knex.schema.dropTable('products');
}
