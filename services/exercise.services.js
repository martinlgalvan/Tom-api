import { MongoClient, ObjectId } from 'mongodb'

const urlPrimary = 'mongodb://martinlgalvan:Onenote11@168.197.48.203:27017/'
const urlSecondary = 'mongodb://127.0.0.1:27017/'
let client = null
let db = null
let exercises = null

async function connectToDatabase() {
  try {
    client = new MongoClient(urlPrimary)
    await client.connect()
    console.log('Conectado a la base de datos primaria.')
  } catch (error) {
    console.log('Error al conectar a la base de datos primaria:', error)
    console.log('Intentando conectar a la base de datos secundaria...')
    client = new MongoClient(urlSecondary)
    await client.connect()
    console.log('Conectado a la base de datos secundaria.')
  }

  db = client.db('TOM')
  exercises = db.collection('Exercise')
}

async function findExercises(week_id, exercise_id) {
  if (!client) {
    await connectToDatabase()
  }

  const exerciseFound = await exercises.findOne({
    _id: ObjectId(week_id),
    'routine.exercises.exercise_id': ObjectId(exercise_id)
  })

  return exerciseFound
}

async function createExercise(dayID, rutine, id) {
  if (!client) {
    await connectToDatabase()
  }

  const newRutine = {
    ...rutine,
    exercise_id: new ObjectId(id)
  }

  const result = await exercises.updateOne(
    { day_id: new ObjectId(dayID) },
    { $push: { exercises: newRutine } }
  )

  if (result.modifiedCount === 0) {
    await exercises.insertOne({ day_id: new ObjectId(dayID), exercises: [newRutine] })
  }
}

async function deleteExercise(week_id, exercise_id) {
  if (!client) {
    await connectToDatabase()
  }

  await exercises.updateOne(
    { _id: new ObjectId(week_id) },
    { $pull: { 'routine.0.exercises': { exercise_id: new ObjectId(exercise_id) } } }
  )
}

async function editExercise(dayId, exerciseId, exercise) {
  if (!client) {
    await connectToDatabase()
  }

  const newExercise = {
    ...exercise,
    exercise_id: new ObjectId(exerciseId)
  }

  await exercises.updateOne(
    { day_id: new ObjectId(dayId), 'exercises.exercise_id': new ObjectId(exerciseId) },
    { $set: { 'exercises.$': newExercise } }
  )
}

export {
  createExercise,
  findExercises,
  deleteExercise,
  editExercise
}
