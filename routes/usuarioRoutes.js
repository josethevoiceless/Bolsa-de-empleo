import express from 'express';
// Importamos los controladores que gestionan las operaciones
import { 
  Getuser, 
  GetUserById, 
  createUser, 
  deleteUser, 
  getUserRecommendations, 
  followUser, 
  unfollowUser, 
  getFollowers, 
  getFollowing 
} from '../controllers/usuarioController.js';

const router = express.Router();

// Rutas básicas de usuario
router.get('/', Getuser);  // Obtener todos los usuarios
router.get('/:id', GetUserById);  // Obtener usuario por ID
router.post('/', createUser);  // Crear un nuevo usuario
router.delete('/:id', deleteUser);  // Eliminar un usuario por ID

// **Rutas adicionales para el algoritmo de recomendaciones**
router.get('/:id/recommendations', getUserRecommendations);  // Obtener recomendaciones personalizadas

// **Rutas para seguir y dejar de seguir usuarios**
router.post('/:id/follow', followUser);  // Seguir a un usuario
router.delete('/:id/unfollow', unfollowUser);  // Dejar de seguir a un usuario

// **Rutas para consultar seguidores y seguidos**
router.get('/:id/followers', getFollowers);  // Obtener lista de seguidores
router.get('/:id/following', getFollowing);  // Obtener lista de seguidos

export default router;
