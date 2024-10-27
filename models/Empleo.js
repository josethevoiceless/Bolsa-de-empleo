import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Empleo = sequelize.define('Empleo', {
  id_empleo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tipo: {
    type: DataTypes.ENUM('tiempo completo', 'medio tiempo', 'freelance', 'prácticas'),
    allowNull: false
  },
  salario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'empleos'
});



export default Empleo;
