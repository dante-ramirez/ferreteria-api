import configuration from './configuration';

export default {
  client: 'postgresql',
  connection: {
    port: configuration.database.port,
    host: configuration.database.host,
    database: configuration.database.name,
    user: configuration.database.user,
    password: configuration.database.password
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './seeds'
  }
};
