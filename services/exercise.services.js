import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://martinlgalvan:Onenote11@168.197.48.203:27017/')
const db = client.db('TOM')
const exercises = db.collection('Exercise')

async function findExercises(week_id,exercise_id){
    return client.connect()
        .then(async function (){
            return exercises.findOne({  _id: ObjectId(week_id), "routine.exercises.exercise_id": ObjectId(exercise_id) })
        }) 
}

async function createExercise(dayID, rutine, id){

    const newRutine = {
        ...rutine,
        exercise_id: new ObjectId(id)
    }

    return client.connect()
        .then(function (galeriaServ){
            return exercises.updateOne({ day_id: new ObjectId(dayID) }, { $push: {exercises: newRutine}})
        })
        .then(function(result){
            if(result.modifiedCount === 0){
                return exercises.insertOne({ day_id: new ObjectId(dayID), exercises: [newRutine] })
            }

        })   
                
}
async function deleteExercise(week_id, exercise_id){
    return client.connect()
        .then(function(){
            return exercises.updateOne({ _id: new ObjectId(week_id) },
            { $pull: { "routine.0.exercises": {exercise_id : new ObjectId(exercise_id) } }})
        })
}

async function editExercise(dayId, exerciseId, exercise){

    const newExercise = {
        ...exercise,
        exercise_id: new ObjectId(exerciseId)
    }
    
    return client.connect()
        .then(function(){
            return exercises.updateOne(
                { day_id: new ObjectId(dayId), "exercises.exercise_id": new ObjectId(exerciseId) },
                { $set: { "exercises.$" : newExercise } }
             )
        })
}


export {
    createExercise,
    findExercises,
    deleteExercise,
    editExercise
}