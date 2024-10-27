import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './Usuario.js';

const Publicacion = sequelize.define('Publicacion', {
  id_publicacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'publicaciones'
});



// Relación con usuarios (Un usuario puede tener muchas publicaciones)
Publicacion.belongsTo(Usuario, { foreignKey: 'idUsuario', onDelete: 'CASCADE' });

export default Publicacion;
