import { MongoClient, ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'

const urlPrimary = 'mongodb://martinlgalvan:Onenote11@168.197.48.203:27017/'
const urlSecondary = 'mongodb://martinlgalvan:sssOnenote11@168.197.48.203:27017/'
let client = null
let db = null
let users = null

async function connectToDatabase() {
  try {
    // Intenta conectar con la primera opción
    client = new MongoClient(urlPrimary)
    await client.connect()
    console.log('Conectado a la base de datos primaria.')
  } catch (error) {
    console.log('Error al conectar a la base de datos primaria:')
    console.log('Intentando conectar a la base de datos secundaria...')
    // Si la conexión con la primera opción falla, intenta con la segunda opción
    client = new MongoClient(urlSecondary)
    await client.connect()
    console.log('Conectado a la base de datos secundaria.')
  }

  db = client.db('TOM')
  users = db.collection('Users')
}

async function findById(id) {
  if (!client) {
    await connectToDatabase()
  }

  const user = await users.findOne({ _id: ObjectId(id) })

  return user
}

async function getUsersByEntrenadorId(entrenador_id) {
  if (!client) {
    await connectToDatabase()
  }

  return users.find({ entrenador_id: new ObjectId(entrenador_id) }).toArray()
}

async function login(userLogin) {
  if (!client) {
    await connectToDatabase()
  }

  const user = await users.findOne({ email: userLogin.email })

  if (!user) {
    throw new Error('No existe el usuario')
  }

  const isMatch = await bcrypt.compare(userLogin.password, user.password)

  if (!isMatch) {
    throw new Error('Contraseña incorrecta')
  }

  return user
}

async function find(filter) {
  if (!client) {
    await connectToDatabase()
  }

  const usersCollection = await users.find(filter).toArray()

  return usersCollection
}

async function create(user, entrenador_id, logo) {
  if (!client) {
    await connectToDatabase()
  }

  const newUser = {
    ...user,
    entrenador_id: new ObjectId(entrenador_id),
    logo: logo,
  }

  const userExist = await users.findOne({ email: newUser.email })

  if (userExist) {
    throw new Error('El email ya existe')
  }

  const salt = await bcrypt.genSalt(10)
  newUser.password = await bcrypt.hash(newUser.password, salt)

  await users.insertOne(newUser)

  return newUser
}

async function remove(id) {
  if (!client) {
    await connectToDatabase()
  }

  await users.deleteOne({ _id: ObjectId(id) })
}

export {
  getUsersByEntrenadorId,
  find,
  create,
  remove,
  login,
  findById
}
