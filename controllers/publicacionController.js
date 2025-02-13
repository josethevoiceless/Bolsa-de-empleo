import Publicacion from '../models/publicacion.js';

// Obtener todas las publicaciones
export const getAllPublicaciones = async (req, res) => {
  try {
    const publicaciones = await Publicacion.findAll();
    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener publicaciones' });
  }
};

// Obtener publicación por ID
export const getPublicacionById = async (req, res) => {
  try {
    const publicacion = await Publicacion.findByPk(req.params.id);
    if (!publicacion) return res.status(404).json({ error: 'Publicación no encontrada' });
    res.status(200).json(publicacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la publicación' });
  }
};

// Crear una nueva publicación
export const createPublicacion = async (req, res) => {
  try {
    const newPublicacion = await Publicacion.create(req.body);
    res.status(201).json(newPublicacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la publicación', error });
  }
};

// Actualizar una publicación
export const updatePublicacion = async (req, res) => {
  try {
    const { id } = req.params; // Obtiene el ID de los parámetros de la ruta
    const [updated] = await Publicacion.update(req.body, { where: { id_publicacion: id } }); // Cambia 'id' por 'id_publicacion'

    if (!updated) return res.status(404).json({ error: 'Publicación no encontrada' });

    const updatedPublicacion = await Publicacion.findByPk(id); // También busca por 'id_publicacion'
    res.status(200).json(updatedPublicacion);
  } catch (error) {
    console.error("Error al actualizar la publicación:", );
    res.status(500).json({ error: 'Error al actualizar la publicación' });
  }
};


// Eliminar una publicación
export const deletePublicacion = async (req, res) => {
  try {
    const result = await Publicacion.destroy({ where: { id_publicacion: req.params.id } });
    if (!result) return res.status(404).json({ error: 'Publicación no encontrada' });

    res.status(200).json({ message: 'Publicación eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la publicación',  });
  }
};
