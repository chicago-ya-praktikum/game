import Validator from 'validatorjs';
import {checkUserStatus} from './utils/helpers'
import {db} from '../models/index'
import {userDataRules} from './utils/requestDataVaidators'

const User = db.users;
const Token = db.tokens

export const create = async (req: any, res: any) => {
    const validation = new Validator(req, userDataRules)

    if (validation.fails()) {
        res.status(400).send({
            message: 'Wrong API'
        })
        return
    }

    const status = await checkUserStatus(req.headers.authorization)

    if (status) {
        res.status(409).send('User already in system')
        return
    }

    const user = {
        displayName: req.body.displayName,
        avatar: req.body.avatar
    }
    const newUser = await User.create(user)

    if (!newUser) {
        res.status(500).send({
            message: 'Some error occurred while creating the forum user.'
        })
        return
    }

    const token = {
        userId: newUser.id,
        token: req.headers.authorization
    }

    const newToken = await Token.create(token)

    if (!newToken) {
        res.status(500).send({
            message: 'Some error occurred while creating the forum user.'
        })
        return
    }

    res.status(201).send(newUser)
};

export const getAll = async (req: any, res: any) => {
    const status = await checkUserStatus(req.headers.authorization)

    if (!status) {
        res.status(401).send('Unauthorized')
        return
    }

    const users = await User.findAll()

    if (!users) {
        res.status(500).send({
            message: 'Some error occurred while reading the list of users.'
        })
        return
    }

    res.status(200).send(users)
}

export const getOne = async (req: any, res: any) => {
    const status = await checkUserStatus(req.headers.authorization)

    if (!status) {
        res.status(401).send('Unauthorized')
        return
    }

    const {id} = req.params

    const user = await User.findOne({where: {id}})

    if (!user) {
        res.status(500).send({
            message: 'Some error occurred while reading attributes of user.'
        })
        return
    }
    res.status(200).send(user)
}
