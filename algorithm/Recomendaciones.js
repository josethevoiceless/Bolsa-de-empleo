import Usuario from '../models/Usuario.js';
import Publicacion from '../models/publicacion.js';
import Like from '../models/likes.js';
import Follow from '../models/follows.js';
import Empleo from '../models/Empleo.js';
import { Op } from 'sequelize';

/**
 * Obtener recomendaciones personalizadas para un usuario.
 * @param {number} userId - ID del usuario que solicita las recomendaciones.
 * @returns {object} Un objeto con recomendaciones de publicaciones y empleos.
 */
export const getRecommendations = async (userId) => {
  try {
    // 1. Obtener los usuarios que sigue el usuario actual.
    const seguidos = await Follow.findAll({
      where: { follower_id: userId },
      attributes: ['following_id'],
    });
    const followedIds = seguidos.map((f) => f.following_id);
    
    // 2. Obtener publicaciones populares y recientes de los seguidos.
   const publicacionesRelevantes = await Publicacion.findAll({
      where: {
        [Op.and]: [
          { id_usuario: { [Op.in]: followedIds } }, // Publicaciones de usuarios seguidos
          { createdAt: { [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },// Última semana
        ],
      },
      include: [{ model: Like, attributes: ['id_usuario'] }],
      order: [['createdAt', 'DESC']],
    });

    // 3. Obtener las publicaciones que el usuario ya ha visto (likes o comentarios).
    const publicacionesVistas = await Like.findAll({
      where: { id_usuario: userId }, 
      attributes: ['idPublicacion'],
    });
    const publicacionesVistasIds = publicacionesVistas.map((like) => like.idPublicacion);

    // Filtrar publicaciones ya vistas en una sola operación.
    const publicacionesFiltradas = publicacionesRelevantes.filter((publicacion) => !publicacionesVistasIds.includes(publicacion.id));

    // 4. Obtener empleos relevantes según el puesto deseado y ubicación del usuario.
    const usuario = await Usuario.findByPk(userId);
    const empleosRelevantes = await Empleo.findAll({
      where: {
        [Op.and]: [
          { puesto: { [Op.like]: `%${usuario.puestoDeseado}%` } }, // Coincidencia parcial con el puesto deseado
          { ubicacion: usuario.ubicacion }, // Filtrado por ubicación del usuario
          { createdAt: { [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }, // Último mes
        ],
      },
      order: [['createdAt', 'DESC']],
    });

    // 5. Obtener publicaciones populares globalmente (backup en caso de que no haya de los seguidos).
    const publicacionesPopulares = await Publicacion.findAll({
      include: [{ model: Like, attributes: ['id_usuario'] }], // Cambiar idUsuario a id_usuario.
      order: [['likesCount', 'DESC']],
      limit: 10,
    });
    

    // 6. Asignar pesos a las publicaciones para priorizar las más relevantes.
    const publicacionesConPeso = publicacionesFiltradas.map((publicacion) => ({
      ...publicacion,
      peso: 1, // Peso alto para publicaciones de usuarios seguidos
    }));

    const publicacionesPopularesConPeso = publicacionesPopulares.map((publicacion) => ({
      ...publicacion,
      peso: 0.5, // Peso menor para publicaciones populares globalmente
    }));

    // 7. Mezclar publicaciones y ordenarlas por peso para ofrecer diversidad.
    const recomendacionesFinales = [...publicacionesConPeso, ...publicacionesPopularesConPeso]
      .sort((a, b) => b.peso - a.peso);

    // 8. Manejo de errores para asegurar que se puedan mostrar recomendaciones si algo falla.
    if (!publicacionesRelevantes.length && !empleosRelevantes.length) {
      throw new Error('No se encontraron recomendaciones relevantes.');
    }

    // 9. Retornar recomendaciones.
    return {
      publicaciones: recomendacionesFinales,
      empleos: empleosRelevantes,
    };
  } catch (error) {
    console.error('Error en el algoritmo de recomendaciones:', error.message);
    throw new Error('No se pudieron obtener recomendaciones.');
  }
};
