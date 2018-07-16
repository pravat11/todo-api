require('babel-register');
require('dotenv').config({ path: __dirname + '/../.env' });

/**
 * Database configuration.
 */
module.exports = {
  client: process.env.DB_CLIENT,
  connection: {
    connectionString: process.env.DB_URL,
    ssl: true
  },
  migrations: {
    tableName: 'migrations',
    directory: './migrations',
    stub: './stubs/migration.stub'
  },
  seeds: {
    directory: './seeds',
    stub: './stubs/seed.stub'
  }
};
