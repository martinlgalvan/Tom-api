import * as ListExercisesService from '../../services/listExercises.services.js'


function findExercises(req, res){

    ListExercisesService.getListExercises()
        .then(function(exercises){
            res.status(200).json(exercises)
        })
}

function createExercise(req, res){

    //Armo lo que quiero guardar

    const exercise = {
        name: req.body.name,
        video: req.body.name
    }

    //Guardo el alumno

    ListExercisesService.newExercise(exercise)
        .then(function(exercise){
            res.status(201).json(exercise)
        })
}

export {
    findExercises,
    createExercise
}