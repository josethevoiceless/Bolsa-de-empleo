import Like from '../models/likes.js';

// Dar like a una publicación
export const likePublicacion = async (req, res) => {
  try {
    const { id: idPublicacion } = req.params;
    const { idUsuario } = req.body;

    const [like, created] = await Like.findOrCreate({
      where: { idPublicacion, idUsuario },
    });

    if (!created) {
      return res.status(400).json({ error: 'Ya diste like a esta publicación' });
    }

    res.status(201).json({ message: 'Like registrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al dar like' });
  }
};

// Quitar like de una publicación
export const unlikePublicacion = async (req, res) => {
  try {
    const { id: idPublicacion } = req.params;
    const { idUsuario } = req.body;

    const result = await Like.destroy({
      where: { idPublicacion, idUsuario },
    });

    if (!result) {
      return res.status(404).json({ error: 'No habías dado like a esta publicación' });
    }

    res.status(200).json({ message: 'Like eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al quitar like' });
  }
};
