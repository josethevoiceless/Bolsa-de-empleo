import express from 'express';
import db from '../database/database.js';
import Router from '../routes/routesUser.js';


const app = express();


app.use(express.json())
 
app.use('/Users' ,Router);
  
 




try {
    await db.authenticate()
    console.log('conexion ala base de datos exitosa ')
} catch (error) {
    console.log('error en la conexion en la bd')
}
 

app.listen(4000, () => {
    console.log('Servidor corriendo en el puerto  4000');
    console.log('Visita http://localhost:4000 para verificar la conexión');
});      