import { MongoClient, ObjectId } from 'mongodb'

const options = { keepAlive: true };

const client = new MongoClient('mongodb://martin:Onenote11@191.96.31.180:27017/',options)
const db = client.db('TOM')
const tokens = db.collection('Tokens')

async function create(token) {
    await client.connect()

    await tokens.insertOne(token)
}


async function findByToken(token) {
    await client.connect()

    const tokenFound = await tokens.findOne({ token })

    return tokenFound
}


async function deleteByToken(token) {
    await client.connect()

    await tokens.deleteOne({ token })
}

export {
    create,
    findByToken,
    deleteByToken
}
