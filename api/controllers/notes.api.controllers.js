
import * as UsersService from '../../services/users.services.js'

//----------------------------------------------------*


function getUser(req, res){

  const trainer_id = req.params.trainer_id

  UsersService.getUsersByEntrenadorId(trainer_id)
    .then((data) => {
      console.log(data)
    })
    
}



export {
  getUser,

}