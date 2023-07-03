import { MongoClient, ObjectId } from 'mongodb'

const urlPrimary = 'mongodb://martinlgalvan:Onenote11@168.197.48.203:27017/'
const urlSecondary = 'mongodb://martinlgalvan:sssOnenote11@168.197.48.203:27017/'
let client = null
let db = null
let tokens = null

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
  tokens = db.collection('Tokens')
}

async function create(token) {
  if (!client) {
    await connectToDatabase()
  }

  await tokens.insertOne(token)
}

async function findByToken(token) {
  if (!client) {
    await connectToDatabase()
  }

  const tokenFound = await tokens.findOne({ token })

  return tokenFound
}

async function deleteByToken(token) {
  if (!client) {
    await connectToDatabase()
  }

  await tokens.deleteOne({ token })
}

export {
  create,
  findByToken,
  deleteByToken
}
