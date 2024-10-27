// controllers/empleoController.js
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
    res.status(500).json({ error: 'Error al crear empleo', error });
  }
};

// Obtener un empleo específico por ID
export const getEmpleoById = async (req, res) => {
  try {
    const empleo = await Empleo.findByPk(req.params.id);
    if (empleo) {
      res.status(200).json(empleo);
    } else {
      res.status(404).json({ error: 'Empleo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el empleo' });
  }
};

// Actualizar un empleo por ID
export const updateEmpleo = async (req, res) => {
  const { id } = req.params;
  try {
    const empleo = await Empleo.findByPk(id);
    if (!empleo) {
      return res.status(404).json({ error: 'Empleo no encontrado' });
    }

    // Actualizar usando `id_empleo` como clave primaria
    await Empleo.update(req.body, { where: { id_empleo: id } });
    const updatedEmpleo = await Empleo.findByPk(id);
    res.status(200).json(updatedEmpleo);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar empleo' });
  }
};

// Eliminar un empleo por ID
export const deleteEmpleo = async (req, res) => {
  try {
    const deleted = await Empleo.destroy({ where: { id_empleo: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Empleo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el empleo' });
  }
};
