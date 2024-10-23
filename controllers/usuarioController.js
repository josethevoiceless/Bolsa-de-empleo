import Usuario from '../models/Usuario.js';
import Follow from '../models/follows.js';
import { getRecommendations } from '../algorithm/Recomendaciones.js';

// Obtener todos los usuarios
export const Getuser = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Obtener un usuario por ID
export const GetUserById = async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const newUser = await Usuario.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

// Eliminar un usuario por ID
export const deleteUser = async (req, res) => {
  try {
    const result = await Usuario.destroy({ where: { id_usuario: req.params.id } }); // Cambié 'id' por 'id_usuario'
    if (!result) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

// Obtener recomendaciones para un usuario
export const getUserRecommendations = async (req, res) => {
  try {
    const recommendations = await getRecommendations(req.params.id);
    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener recomendaciones' });
  }
};

// Seguir a un usuario
export const followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { followerId } = req.body;

    if (id === followerId) {
      return res.status(400).json({ error: 'No puedes seguirte a ti mismo' });
    }

    const [follow, created] = await Follow.findOrCreate({
      where: { follower_id: followerId, following_id: id },
    });

    if (!created) {
      return res.status(400).json({ error: 'Ya sigues a este usuario' });
    }

    res.status(201).json({ message: 'Usuario seguido' });
  } catch (error) {
    res.status(500).json({ error: 'Error al seguir usuario', error });
  }
};

// Dejar de seguir a un usuario
export const unfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { followerId } = req.body;

    const result = await Follow.destroy({
      where: { follower_id: followerId, following_id: id },
    });

    if (!result) {
      return res.status(404).json({ error: 'No sigues a este usuario' });
    }

    res.status(200).json({ message: 'Dejaste de seguir al usuario' });
  } catch (error) {
    res.status(500).json({ error: 'Error al dejar de seguir usuario' });
  }
};

// Obtener lista de seguidores
export const getFollowers = async (req, res) => {
  try {
    const followers = await Follow.findAll({
      where: { following_id: req.params.id },
    });
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener seguidores' });
  }
};

// Obtener lista de seguidos
export const getFollowing = async (req, res) => {
  try {
    const following = await Follow.findAll({
      where: { follower_id: req.params.id },
    });
    res.status(200).json(following);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener seguidos' });
  }
};
