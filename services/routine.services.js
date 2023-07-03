import { MongoClient, ObjectId } from 'mongodb'
import { getDate } from './../date/formatedDate.js'

let client = null
let db = null
let routine = null

const urlPrimary = 'mongodb://martinlgalvan:Onenote11@168.197.48.203:27017/'
const urlSecondary = 'mongodb://martinlgalvan:sssOnenote11@168.197.48.203:27017/'

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
  routine = db.collection('Routine')
}

async function getRoutine(filter) {
  if (!client) {
    await connectToDatabase()
  }

  const filterQuery = { ...filter }

  if (filterQuery.rutina) {
    filterQuery.rutina = { $regex: filterQuery.rutina }
  }

  return routine.find(filterQuery).toArray()
}

async function getRoutineById(id) {
  if (!client) {
    await connectToDatabase()
  }

  return routine.find({ _id: new ObjectId(id) }).toArray()
}

async function getRoutineByUserId(id) {
  
  console.log(getDate())
  if (!client) {
    await connectToDatabase()
  }

  return routine
    .find({ user_id: new ObjectId(id) })
    .sort({ "created_at.fecha": -1 })
    .toArray()
}

async function createDay(day, weekId) {
  if (!client) {
    await connectToDatabase()
  }

  return routine.updateOne(
    { _id: new ObjectId(weekId) },
    { $push: { routine: day } }
  )
}

async function deleteDay(week_id, day_id) {
  if (!client) {
    await connectToDatabase()
  }

  return routine.updateOne(
    { _id: new ObjectId(week_id), 'routine._id': new ObjectId(day_id) },
    { $pull: { routine: { _id: new ObjectId(day_id) } } }
  )
}

async function createWeek(week, user_id) {
  if (!client) {
    await connectToDatabase()
  }

  const newWeek = {
    ...week,
    user_id: new ObjectId(user_id),
    created_at: getDate(),
  }

  await routine.insertOne(newWeek)

  return newWeek
}

async function deleteWeek(weekId) {
  if (!client) {
    await connectToDatabase()
  }

  return routine.deleteOne({ _id: new ObjectId(weekId) })
}

async function editWeek(weekID, week) {
  if (!client) {
    await connectToDatabase()
  }

  return routine.updateOne({ _id: new ObjectId(weekID) }, { $set: week })
}

async function editDay(week_id, day_id, day) {
  if (!client) {
    await connectToDatabase()
  }

  return routine.updateOne(
    { 'routine._id': new ObjectId(day_id) },
    { $set: { 'routine.$.name': day } }
  )
}

async function findExercises(week_id, exercise_id) {
  if (!client) {
    await connectToDatabase()
  }

  return routine.findOne({
    _id: new ObjectId(week_id),
    'routine.exercises.exercise_id': new ObjectId(exercise_id),
  })
}

async function createExercise(week_id, day_id, exercise, id) {
  if (!client) {
    await connectToDatabase()
  }

  const newExercise = {
    ...exercise,
    exercise_id: new ObjectId(id),
  }

  return routine.updateOne(
    {
      _id: new ObjectId(week_id),
      $or: [{ 'routine._id': day_id }, { 'routine._id': new ObjectId(day_id) }],
    },
    { $push: { 'routine.$[element].exercises': newExercise } },
    { arrayFilters: [{ $or: [{ 'element._id': day_id }, { 'element._id': new ObjectId(day_id) }] }] }
  )
}

async function editExercise(week_id, day_id, exercise_id, exercise) {
  if (!client) {
    await connectToDatabase()
  }

  const newExercise = {
    ...exercise,
    exercise_id: new ObjectId(exercise_id),
  }

  return routine.updateOne(
    {
      _id: new ObjectId(week_id),
      'routine.exercises.exercise_id': new ObjectId(exercise_id),
    },
    { $set: { 'routine.$[day].exercises.$[element]': newExercise } },
    {
      arrayFilters: [
        { 'day._id': new ObjectId(day_id) },
        { 'element.exercise_id': new ObjectId(exercise_id) },
      ],
    }
  )
}

async function editExerciseInAmrap(week_id, day_id, exercise_id, exercise) {
  if (!client) {
    await connectToDatabase()
  }

  const newExercise = {
    ...exercise,
    exercise_id: new ObjectId(exercise_id),
  }

  return routine.updateOne(
    {
      _id: new ObjectId(week_id),
      'routine.exercises.exercise_id': new ObjectId(exercise_id),
    },
    { $set: { 'routine.$[day].exercises.$[element]': newExercise } },
    {
      arrayFilters: [
        { 'day._id': new ObjectId(day_id) },
        { 'element.exercise_id': new ObjectId(exercise_id) },
      ],
    }
  )
}

async function deleteExercise(week_id, day_id, exercise_id) {
  if (!client) {
    await connectToDatabase()
  }

  return routine.updateOne(
    { _id: new ObjectId(week_id) },
    {
      $pull: {
        'routine.$[day].exercises': {
          $or: [{ exercise_id: new ObjectId(exercise_id) }, { exercise_id: exercise_id }],
        },
      },
    },
    { arrayFilters: [{ $or: [{ 'day._id': day_id }, { 'day._id': new ObjectId(day_id) }] }] }
  )
}

// BLOQUE DE MOVILIDAD / ENTRADA EN CALOR

async function findWarmUp(week_id, warmup_id) {
  if (!client) {
    await connectToDatabase()
  }

  return routine.findOne({
    _id: new ObjectId(week_id),
    'routine.warmup.warmup_id': new ObjectId(warmup_id),
  })
}

async function createWarmUp(week_id, day_id, warmup, id) {
  if (!client) {
    await connectToDatabase()
  }

  const warmUp = {
    ...warmup,
    warmup_id: new ObjectId(id),
  }

  return routine.updateOne(
    {
      _id: new ObjectId(week_id),
      $or: [{ 'routine._id': day_id }, { 'routine._id': new ObjectId(day_id) }],
    },
    { $push: { 'routine.$[element].warmup': warmUp } },
    { arrayFilters: [{ $or: [{ 'element._id': day_id }, { 'element._id': new ObjectId(day_id) }] }] }
  )
}

async function editWarmUp(week_id, day_id, warmup_id, warmup) {
  if (!client) {
    await connectToDatabase()
  }

  const newWarmup = {
    ...warmup,
    warmup_id: new ObjectId(warmup_id),
  }

  return routine.updateOne(
    {
      _id: new ObjectId(week_id),
      $or: [{ 'routine.warmup.warmup_id': warmup_id }, { 'routine.warmup.warmup_id': new ObjectId(warmup_id) }],
    },
    { $set: { 'routine.$[day].warmup.$[element]': newWarmup } },
    { arrayFilters: [{ 'day._id': new ObjectId(day_id) }, { 'element.warmup_id': new ObjectId(warmup_id) }] }
  )
}

async function deleteWarmup(week_id, day_id, warmup_id) {
  if (!client) {
    await connectToDatabase()
  }

  return routine.updateOne(
    { _id: new ObjectId(week_id) },
    {
      $pull: {
        'routine.$[day].warmup': { warmup_id: new ObjectId(warmup_id) },
      },
    },
    { arrayFilters: [{ $or: [{ 'day._id': day_id }, { 'day._id': new ObjectId(day_id) }] }] }
  )
}

export {
  getRoutine,
  getRoutineById,
  getRoutineByUserId,
  createWeek,
  editWeek,
  deleteWeek,
  createDay,
  deleteDay,
  editDay,
  createExercise,
  editExercise,
  editExerciseInAmrap,
  deleteExercise,
  findExercises,
  findWarmUp,
  createWarmUp,
  editWarmUp,
  deleteWarmup,
}









/*    //¿Por qué tánto quilombo acá, en vez de una query simple? Por qué en la aplicación busqué crear copias de elementos, y las realicé en el front.
    //No hubo manera de introducirlas con el objectID, por lo que la primera vez que se edita es un string normal, aunque sigue siendo un objectID en el front.
    //Por lo que al editar por primera vez, ya se convierte en OBJECT ID en la base de datos, normalizandola.
    return client.connect()
        .then(function(){
            return routine.updateOne(
                {  _id: new ObjectId(week_id), $or: [{"routine.exercises.exercise_id": exercise_id}, {"routine.exercises.exercise_id": new ObjectId(exercise_id)}]  },
                { $set: { "routine.$[day].exercises.$[element]" : newExercise } }, { arrayFilters: [ { $or: [{"day._id": day_id}, {"day._id": new ObjectId(day_id)}] }, {$or: [{"element.exercise_id": exercise_id}, {"element.exercise_id": new ObjectId(exercise_id)}]} ] })
             
        })*/