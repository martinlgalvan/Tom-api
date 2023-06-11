import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://martinlgalvan:Onenote11@168.197.48.203:27017/')
const db = client.db('TOM')
const exercises = db.collection('ListExercises')


async function getListExercises(){

    return client.connect()
        .then(async function () {
            return exercises.find().toArray()
        })
}


async function newExercise(exercise){

    return client.connect()
        .then(function(){
            return exercises.insertOne(exercise)
        })
}

export {
    getListExercises,
    newExercise
}
