// server.js (ajustado)

import express from 'express';
import db from '../database/database.js';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../models/Usuario.js';
import Router from '../routes/usuarioRoutes.js';
import publicacionesRoutes from '../routes/publicacionRoutes.js';
import likeRoutes from '../routes/likeRoutes.js';
import empleoRoutes from '../routes/empleoRoutes.js';
import { getRecommendations } from '../algorithm/Recomendaciones.js';
import { configurarAsociaciones } from '../models/asociaciones.js';

const app = express();
dotenv.config();

// Configurar asociaciones de modelos
configurarAsociaciones();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas principales
app.use('/usuarios', Router);
app.use('/publicaciones', publicacionesRoutes);
app.use('/publicaciones', likeRoutes);
app.use('/empleos', empleoRoutes);

// Ruta para obtener recomendaciones de un usuario específico
app.get('/usuarios/:userId/recommendations', async (req, res) => {
    try {
        const recommendations = await getRecommendations(req.params.userId);
        res.status(200).json(recommendations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para login
app.post('/login', async (req, res) => {
    const secretKey = process.env.SECRET_KEY;
    try {
        if (!secretKey) throw new Error('SECRET_KEY no está definido en el archivo .env');
        const { email, password } = req.body;
        const user = await UserModel.findOne({ where: { email } });

        if (!user || password !== user.password) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }

        const token = jwt.sign({ userId: user.id_usuario, nombre: user.nombre }, secretKey, { expiresIn: '1h' });
        return res.json({ token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Verificar conexión a la base de datos
db.authenticate()
    .then(() => console.log('Conexión a la base de datos exitosa'))
    .catch(error => console.error('Error en la conexión a la base de datos:', error));

// Iniciar servidor
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Visita http://localhost:${PORT} para verificar la conexión`);
});
