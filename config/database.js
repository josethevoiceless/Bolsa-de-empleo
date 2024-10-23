// database/database.js
import { Sequelize } from 'sequelize';

const db = new Sequelize('bolsa_empleos', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});
 
export default db; 
 
