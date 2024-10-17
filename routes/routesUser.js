
import  expres from 'express';
//importamos los metodos que se encargaran de realizar las operaciones
import {Getuser,GetUserById,createUser,deleteUser} from '../controllers/userControllers.js'

//creamos una nueva instancia de express router
const router = expres.Router();

//ruta para obtener todos los usuarios
router.get('/',Getuser)  
//ruta para obtener un usuario por id
router.get('/:id',GetUserById)
//ruta para crear un nuevo usuario
router.post('/',createUser)
//ruta para eliminar un usuario por id
router.delete('/:id',deleteUser)

//exportamos la configuracion de las rutas
export default router 

