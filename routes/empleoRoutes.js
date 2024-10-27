// routes/empleoRoutes.js
import express from 'express';
import { getAllEmpleos, createEmpleo, getEmpleoById, updateEmpleo, deleteEmpleo } from '../controllers/empleoController.js';

const router = express.Router();

// Ruta para obtener todos los empleos
router.get('/', getAllEmpleos);

// Ruta para crear un nuevo empleo
router.post('/', createEmpleo);

// Ruta para obtener un empleo específico por su ID
router.get('/:id', getEmpleoById);

// Ruta para actualizar un empleo existente por su ID
router.put('/:id', updateEmpleo);

// Ruta para eliminar un empleo por su ID
router.delete('/:id', deleteEmpleo);

export default router;
