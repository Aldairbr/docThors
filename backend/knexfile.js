const {
  DB_CLIENT,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
} = require('./src/Config/envConfig');

module.exports = {
  development: {
    client: DB_CLIENT,
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
    },
    migrations: {
      directory: './src/Database/migrations',
    },
    useNullAsDefault: true,
  },
};
