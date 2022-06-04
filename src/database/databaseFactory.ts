import Knex from 'knex';
import knexfile from '../../knexfile';
import SQLDatabase from './sql/database';

export default class DatabaseFactory {
  async getDatbase() {
    return new SQLDatabase(Knex(knexfile));
  }
}
