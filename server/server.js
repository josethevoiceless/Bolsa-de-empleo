import express from 'express';
import db from '../database/database.js';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import UserModel from '../models/modelUsers.js';
import Router from '../routes/routesUser.js';
import dotenv from 'dotenv'; 

const app = express();


// cargar las variables de entorno definidas en el archivo .env
dotenv.config();


// habilitar el uso de json en el body de la request
app.use(express.json())

// habilitar el uso de cors para permitir peticiones desde dominios diferentes
app.use(cors())

// definir la ruta para las operaciones de usuarios
app.use('/Users' ,Router);





app.post('/login', async (req, res) => {
    // obtener la clave secreta desde el archivo .env
    const secretKey = process.env.SECRET_KEY;

    try {
        // verificar si la clave secreta existe
        if (!secretKey) {  
            throw new Error('SECRET_KEY is not defined in .env file');
        }
        // obtener el email y la Contraseña del body de la request
        const {email,password} = req.body;
        // buscar el usuario en la base de datos por email
        const user = await UserModel.findOne({ where: { email } });

        // verificar si el usuario existe o si la cedula es incorrecta
        if (!user || password !== user.password) {
            return res.status(401).json({ message: 'Cedula o Contraseña incorrectos' });
        } 

        // Generar el token utilizando la clave secreta
        const token = jwt.sign({ Cedula: user.password, nombre: user.nombre}, secretKey, { expiresIn: '1s' });

        // Responder con el token
        return res.json({ token }); 

    } catch (error) {
        // responder con el error en caso de que algo falle
        return res.status(500).json({ message: error.message });
    }
});  
 



/* esta vaina ya se deduce por logica pendejos */
try {
    await db.authenticate()
    console.log('conexion ala base de datos exitosa ')
} catch (error) {
    console.log('error en la conexion en la bd')
}
 
/* el servidor corre en el puerto 4000 pero ustedes pueden cambiarlo al puerto que deseen pero lesrecomiendo que lo dejen ahi ;) */
app.listen(4000, () => {
    console.log('Servidor corriendo en el puerto  4000');
    console.log('Visita http://localhost:4000 para verificar la conexión');
});      
