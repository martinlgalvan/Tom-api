import express from 'express'
import * as NotesController from '../controllers/notes.api.controllers.js'

import {isLogin, isAdmin} from '../middleware/auth.middleware.js'

const router = express.Router()


//  Exercise part
router.route('/api/entrenador_id/:trainer_id')
    .get([isLogin, isAdmin]),NotesController.getUser
    .post([isLogin, isAdmin],RoutineController.createNote)
    .put([isLogin, isAdmin],RoutineController.editNote)
    .delete([isLogin,isAdmin], RoutineController.deleteNote)


export default router