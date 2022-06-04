import { Knex as _Knex } from 'knex';

export async function up(knex: _Knex): Promise<void> {
  await knex.raw(`
    SELECT 'CREATE DATABASE ferreteria'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ferreteria')  
  `);
}

export async function down(knex: _Knex): Promise<void> {
  await knex.raw(`
    SELECT 'DROP DATABASE ferreteria'
    WHERE EXISTS (SELECT FROM pg_database WHERE datname = 'ferreteria')  
  `);
}
