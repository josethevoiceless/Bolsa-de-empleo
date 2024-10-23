import { getRecommendations } from '../algorithm/Recomendaciones.js';

export const getUserRecommendations = async (req, res) => {
  const userId = req.user.id; // Suponiendo que usas autenticación con JWT

  try {
    const recommendations = await getRecommendations(userId);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo recomendaciones' });
  }
};
