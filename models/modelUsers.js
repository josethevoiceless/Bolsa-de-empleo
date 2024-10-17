import { DataTypes } from 'sequelize';
import db from '../database/database.js';


const Tabla = db.define('usuarios', {
    nombre: { type: DataTypes.STRING }, 
    apellido: { type: DataTypes.STRING }, 
    email: { type: DataTypes.STRING }, 
    password: { type: DataTypes.STRING },
  
  });
      
export default Tabla