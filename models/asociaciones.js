// models/asociaciones.js
import Usuario from './Usuario.js';
import Publicacion from './publicacion.js';
import Like from './likes.js';
import Follow from './follows.js';
import Empleo from './Empleo.js';

export function configurarAsociaciones() {
  // Asociaciones de Publicación
  Publicacion.belongsTo(Usuario, { 
    foreignKey: 'idUsuario',
    onDelete: 'CASCADE'
  });
  Publicacion.hasMany(Like, { 
    foreignKey: 'idPublicacion' 
  });

  // Asociaciones de Usuario
  Usuario.hasMany(Publicacion, {
    foreignKey: 'idUsuario'
  });
  Usuario.hasMany(Like, {
    foreignKey: 'idUsuario'
  });

  // Asociaciones de Follow (seguidores)
  Usuario.belongsToMany(Usuario, {
    through: Follow,
    as: 'followers',
    foreignKey: 'following_id',
    otherKey: 'follower_id'
  });
  Usuario.belongsToMany(Usuario, {
    through: Follow,
    as: 'following',
    foreignKey: 'follower_id',
    otherKey: 'following_id'
  });

  // Asociaciones de Empleo
  Empleo.belongsTo(Usuario, {
    foreignKey: 'id_empleador',
    as: 'empleador'
  });
}