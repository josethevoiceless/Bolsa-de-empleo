// models/Like.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './Usuario.js';
import Publicacion from './publicacion.js';

const Like = sequelize.define('Like', {
  id_like: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id_usuario'
    }
  },
  idPublicacion: {
    type: DataTypes.INTEGER,
    references: {
      model: Publicacion,
      key: 'id_publicacion'
    }
  }
}, {
  tableName: 'likes',
  timestamps: true
});

export default Like;
