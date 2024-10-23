import express from 'express';
import db from '../database/database.js';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import UserModel from '../models/Usuario.js';
import Router from '../routes/usuarioRoutes.js';
import dotenv from 'dotenv'; 
import recommendationRoutes from '../routes/recommendationRoutes.js';

const app = express();

// Cargar las variables de entorno definidas en el archivo .env
dotenv.config();

// Habilitar el uso de JSON en el body de la request
app.use(express.json());

// Habilitar el uso de CORS para permitir peticiones desde dominios diferentes
app.use(cors());

// Definir la ruta para las operaciones de usuarios
app.use('/usuarios', Router); // Aquí se corrige el prefijo a /usuarios

// Definir la ruta de las recomendaciones
app.use('/api', recommendationRoutes);

// Ruta para login
app.post('/login', async (req, res) => {
    const secretKey = process.env.SECRET_KEY;
    try {
        if (!secretKey) {
            throw new Error('SECRET_KEY is not defined in .env file');
        }
        const { email, password } = req.body;
        const user = await UserModel.findOne({ where: { email } });

        if (!user || password !== user.password) {
            return res.status(401).json({ message: 'Cedula o Contraseña incorrectos' });
        }

        const token = jwt.sign({ Cedula: user.password, nombre: user.nombre }, secretKey, { expiresIn: '1s' });

        return res.json({ token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Verificar la conexión a la base de datos
try {
    await db.authenticate();
    console.log('Conexión a la base de datos exitosa');
} catch (error) {
    console.error('Error en la conexión a la base de datos:', error.message);
    console.error('Detalles completos del error:', error);
}

// Iniciar el servidor en el puerto 3006
app.listen(3006, () => {
    console.log('Servidor corriendo en el puerto 3006');
    console.log('Visita http://localhost:3006 para verificar la conexión');
});
