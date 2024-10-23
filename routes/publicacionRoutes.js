import express from 'express';
import { 
  getAllPublicaciones, 
  getPublicacionById, 
  createPublicacion, 
  updatePublicacion, 
  deletePublicacion 
} from '../controllers/publicacionController.js';

const router = express.Router();

// Obtener todas las publicaciones
router.get('/', getAllPublicaciones);

// Obtener una publicación por ID
router.get('/:id', getPublicacionById);

// Crear una nueva publicación
router.post('/', createPublicacion);

// Actualizar una publicación por ID
router.put('/:id', updatePublicacion);

// Eliminar una publicación por ID
router.delete('/:id', deletePublicacion);

export default router;
