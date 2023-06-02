import express from 'express'
import * as RoutineController from '../controllers/routine.api.controllers.js'

import {isLogin, isAdmin} from '../middleware/auth.middleware.js'

const router = express.Router()


//  Exercise part
router.route('/api/week/:week_id/day/:day_id/exercise/:exercise_id')
    .put([isLogin, isAdmin],RoutineController.editById)
    .delete([isLogin,isAdmin], RoutineController.deleteExercise)

router.route('/api/week/:week_id/day/:day_id/exercises')
    .post([isLogin,isAdmin],RoutineController.createExercise)

router.route('/api/week/:week_id/day/:day_id/exercises/amrap')
    .post([isLogin,isAdmin],RoutineController.createAmrap)


router.route('/api/week/:week_id/day/:day_id/exercise/:exercise_id/amrap')
    .put([isLogin,isAdmin],RoutineController.editExerciseInAmrap)
    //.delete([isLogin,isAdmin], RoutineController.deleteExercise)

//Warmup part

router.route('/api/week/:week_id/day/:day_id/warmup')
    .post([isLogin,isAdmin],RoutineController.createWarmUp)

router.route('/api/week/:week_id/warmup/:warmup_id')
    .get([isLogin, isAdmin],RoutineController.findWarmup)

router.route('/api/week/:week_id/day/:day_id/warmup/:warmup_id')
    .put([isLogin, isAdmin],RoutineController.editWarmUp)
    .delete([isLogin,isAdmin], RoutineController.deletewarmUp)

export default router