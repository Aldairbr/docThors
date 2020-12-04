const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

const { DB_CLIENT } = process.env;
const { DB_HOST } = process.env;
const { DB_USER } = process.env;
const { DB_PASS } = process.env;
const { DB_NAME } = process.env;

const { PORT } = process.env || 3333;

module.exports = {
  DB_CLIENT,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
  PORT,
};
