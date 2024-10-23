import Empleo from '../models/Empleo.js';

// Obtener todos los empleos
export const getAllEmpleos = async (req, res) => {
  try {
    const empleos = await Empleo.findAll();
    res.status(200).json(empleos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empleos' });
  }
};

// Crear un nuevo empleo
export const createEmpleo = async (req, res) => {
  try {
    const newEmpleo = await Empleo.create(req.body);
    res.status(201).json(newEmpleo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear empleo' });
  }
};
