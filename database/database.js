// database/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bolsa_empleo', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
