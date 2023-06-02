import { MongoClient, ObjectId } from 'mongodb'

import * as UsersService from './users.services.js'

const client = new MongoClient('mongodb+srv://martinlgalvan:onenote11@tom-cluster.nreeedp.mongodb.net/?retryWrites=true&w=majority')
const db = client.db('TOM')
const users = db.collection('Notes')

function getUser(trainer_id){

  UsersService.getUsersByEntrenadorId(id)
    .then((data) => {
      console.log(data)
    })
    
}

export {

}

