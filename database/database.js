// database/database.js
import { Sequelize } from 'sequelize';

const db = new Sequelize('bolsa_empleos', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306, // Cambiar si usas otro puerto
});

export default db; 
 
