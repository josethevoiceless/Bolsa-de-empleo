import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  foto_perfil: {
    type: DataTypes.STRING,
    allowNull: true
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  seguidos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  seguidores: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  puestoDeseado: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rol: {
    type: DataTypes.ENUM('empleador', 'candidato'),
    allowNull: false
  }
}, {
  timestamps: true, // Para manejar createdAt y updatedAt automáticamente
  tableName: 'usuarios'
});



export default Usuario;
