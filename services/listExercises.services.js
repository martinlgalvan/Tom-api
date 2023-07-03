import { MongoClient, ObjectId } from 'mongodb'

const urlPrimary = 'mongodb://martinlgalvan:Onenote11@168.197.48.203:27017/'
const urlSecondary = 'mongodb://martinlgalvan:sssOnenote11@168.197.48.203:27017/'
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
  exercises = db.collection('ListExercises')
}

async function getListExercises(id) {
  if (!client) {
    await connectToDatabase()
  }

  const exerciseList = await exercises.find({ user_id: new ObjectId(id) }).toArray()

  return exerciseList
}

async function createExercise(exercise, user_id) {
  if (!client) {
    await connectToDatabase()
  }

  const Newexercise = {
    ...exercise,
    user_id: new ObjectId(user_id)
  }

  await exercises.insertOne(Newexercise)

  return Newexercise
}

async function editExercise(exercise_id, exercise) {
  if (!client) {
    await connectToDatabase()
  }

  await exercises.updateOne(
    { _id: new ObjectId(exercise_id) },
    { $set: exercise }
  )
}

async function deleteExercise(id) {
  if (!client) {
    await connectToDatabase()
  }

  await exercises.deleteOne({ _id: new ObjectId(id) })
}

export {
  getListExercises,
  createExercise,
  editExercise,
  deleteExercise
}
