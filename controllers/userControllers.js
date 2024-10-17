import UserModel from "../models/modelUsers.js";



export async function  Getuser (req, res) {
  try {
    const user = await  UserModel.findAll()
      res.send(user)
  } catch (error) {
    res.json({"message": error.message}) 
  }
}

export async function GetUserById (req, res) {
  try {
    const user = await  UserModel.findOne({where: {id: req.params.id}})
      res.send(user)
  } catch (error) {
    res.json({"message": error.message}) 
  }
}


export const createUser = async (req,res)=> {
    try {
        await UserModel.create(req.body)
        res.json({
            "message": "usuario creado"
        })
        } catch (error) {
          res.json({
            "message": error.message
          })
    }
    }
    



export async function deleteUser (req, res) { 
  try {
   await  UserModel.destroy({where: {id: req.params.id}})
  } catch (error) {
    res.json({"message": "no se pudo eliminar el usuario"})
  } 
}