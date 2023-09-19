require('dotenv').config();

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'database',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

module.exports = pool.promise();
