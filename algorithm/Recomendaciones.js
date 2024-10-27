// algorithm/Recomendaciones.js

import Usuario from '../models/Usuario.js';
import Empleo from '../models/Empleo.js';
import Publicacion from '../models/publicacion.js';
import Like from '../models/likes.js';
import Follow from '../models/follows.js';

export const getRecommendations = async (userId) => {
    try {
        // Obtener el usuario
        const usuario = await Usuario.findByPk(userId);
        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }

        // **1. Filtrado basado en contenido**
        const contentBasedRecommendations = await getContentBasedRecommendations(usuario);

        // **2. Filtrado colaborativo**
        const collaborativeRecommendations = await getCollaborativeRecommendations(usuario);

        // **3. Descomposición matricial**
        const matrixFactorizationRecommendations = await getMatrixFactorizationRecommendations(usuario);

        // Combinar y retornar recomendaciones
        return {
            contentBased: contentBasedRecommendations,
            collaborative: collaborativeRecommendations,
            matrixFactorization: matrixFactorizationRecommendations
        };
    } catch (error) {
        console.error("Error al obtener recomendaciones:", error);
        throw error;
    }
};

// Función de recomendaciones basadas en contenido
const getContentBasedRecommendations = async (usuario) => {
    try {
        // Filtrar empleos según el puesto deseado y ubicación
        const empleosRecomendados = await Empleo.findAll({
            where: {
                puestoDeseado: usuario.puestoDeseado,
                ubicacion: usuario.ubicacion
            }
        });
        return empleosRecomendados;
    } catch (error) {
        console.error("Error en filtrado basado en contenido:", error);
        return [];
    }
};

// Función de recomendaciones colaborativas
const getCollaborativeRecommendations = async (usuario) => {
    try {
        // Filtrar publicaciones con likes de usuarios similares
        const publicacionesConLikes = await Publicacion.findAll({
            include: [{
                model: Like,
                where: { idUsuario: usuario.id_usuario }
            }]
        });
        return publicacionesConLikes;
    } catch (error) {
        console.error("Error en filtrado colaborativo:", error);
        return [];
    }
};

// Función de recomendaciones usando descomposición matricial
const getMatrixFactorizationRecommendations = async (usuario) => {
    try {
        // Algoritmo básico de descomposición matricial (aquí va la lógica)
        // Este enfoque puede requerir un modelo de aprendizaje de máquina avanzado
        // Aquí retornamos una lista ficticia hasta integrar la lógica de descomposición
        return ["Publicacion X", "Publicacion Y"];
    } catch (error) {
        console.error("Error en descomposición matricial:", error);
        return [];
    }
};
