import express from 'express'
import * as usersController from '../controllers/users.api.controllers.js'
import * as RoutineController from '../controllers/routine.api.controllers.js'


import {isLogin, isAdmin} from '../middleware/auth.middleware.js'
import {ValidateLogin, ValidateRegister} from '../middleware/validar.middleware.js'

const router = express.Router()


// Sesion
router.route('/api/users/login')
    .post([ValidateLogin], usersController.login)

router.route('/api/users/logout')
    .post(usersController.logout)


//Para encontrar usuarios según el id del entrenador, y crearlos
router.route('/api/users/:idEntrenador')
    .get([isLogin, isAdmin],usersController.getUsersByEntrenador)
    .post([isLogin, isAdmin, ValidateRegister],usersController.create)

//Para encontrar y/o eliminar un usuario
router.route('/api/user/:userId')
    .get([isLogin, isAdmin],usersController.getUserById)
    .delete([isLogin, isAdmin],usersController.removeUser)



export default router

/*import express from 'express'
import * as NotesController from '../controllers/notes.api.controllers.js'

import {isLogin, isAdmin} from '../middleware/auth.middleware.js'

const router = express.Router()


//  Exercise part
router.route('/api/entrenador_id/:trainer_id')
    .get([isLogin, isAdmin]),NotesController.getUser
    .post([isLogin, isAdmin],RoutineController.createNote)
    .put([isLogin, isAdmin],RoutineController.editNote)
    .delete([isLogin,isAdmin], RoutineController.deleteNote)


export default router*/