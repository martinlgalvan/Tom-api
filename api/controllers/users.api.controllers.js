import jwt from 'jsonwebtoken'
import * as UsersService from '../../services/users.services.js'
import * as TokenService from '../../services/token.services.js'

//----------------------------------------------------*

function login(req, res) {
    UsersService.login(req.body)
        .then(user => {
            const token = jwt.sign({ id: user._id, role: 'admin' }, 'toq_')
            TokenService.create({ token, user_id: user._id })

            res.status(200).json({ token, user })

        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

function logout(req, res) {
    const token = req.headers['auth-token']

    TokenService.deleteByToken(token)

    res.json({ message: 'Logout exitoso' })

}

//----------------------------------------------------*


function getUserById(req, res){
    const id = req.params.userId

    UsersService.findById(id)
        .then(function(user){
            if(user){
                res.status(200).json(user)
            } else{
                res.status(404).json({message: "Usuario no encontrado."})
            }
        })
       
}



function find(req, res) {
    const filter = {}

    const token = req.headers['auth-token']

    if (!token) {
        res.status(401).json({ message: 'No se envio un token' })
        return
    }

    try {
        const payload = jwt.verify(token, 'esto')
    } catch (err) {
        res.status(401).json({ message: 'Token invalido' })
        return
    }

    UsersService.find(filter)
        .then(users => {
            res.json(users)
        })
}

function getUsersByEntrenador(req, res) {
    const filter = {}
    const entrenador_id = req.params.idEntrenador

    UsersService.getUsersByEntrenadorId(entrenador_id)
    .then(function(user){
        if(user){
            res.status(200).json(user)
        } else{
            res.status(404).json({message: "No es posible realizar esta acción."})
        }
    })
   
}

function create(req, res) {
    const entrenador_id = req.params.idEntrenador
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: "common"
    }

    UsersService.create(user, entrenador_id)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

function removeUser(req, res) {
    const id = req.params.userId

    UsersService.remove(id)
        .then(() => {
            res.json({ message: 'Usuario eliminado' })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}






export {
    getUserById,
    getUsersByEntrenador,
    find,
    create,
    removeUser,
    login,
    logout
}