import {checkUserStatus, createBadResponse, ErrorName} from './utils/helpers'
import {db} from '../models/index'

const User = db.users
const Token = db.tokens

export const create = async (req: any, res: any) => {
    try {
        const status = await checkUserStatus(req.headers.authorization)

        if (status) {
            res.status(409).send(
                createBadResponse(ErrorName.AUTH_CONFLICT)
            )
            return
        }

        const {displayName} = req.body
        if (typeof displayName !== 'string') {
            res.status(400).send(createBadResponse(ErrorName.DISPLAY_NAME_MUST_BE_STRING))
        }

        let {avatar} = req.body
        if (typeof avatar !== 'string') {
            avatar = null
        }

        const user = {
            displayName,
            avatar
        }
        const newUser = await User.create(user)

        if (!newUser) {
            res.status(500).send(
                createBadResponse(ErrorName.USER_NOT_CREATED)
            )
            return
        }

        const token = {
            userId: newUser.id,
            token: req.headers.authorization
        }

        const newToken = await Token.create(token)

        if (!newToken) {
            res.status(500).send(
                createBadResponse(ErrorName.TOKEN_NOT_CREATED)
            )
            return
        }

        res.status(201).send(newUser)
    } catch (err) {
        res.status(500).send(
            createBadResponse(ErrorName.CATCH_ERROR)
        )
    }
}

export const getAll = async (req: any, res: any) => {
    try {
        const status = await checkUserStatus(req.headers.authorization)

        if (!status) {
            res.status(401).send(
                createBadResponse(ErrorName.UNAUTHORIZED)
            )
            return
        }

        const users = await User.findAll()

        if (!users) {
            res.status(500).send(
                createBadResponse(ErrorName.INTERNAL_ERROR)
            )
            return
        }

        res.status(200).send(users)
    } catch (err) {
        res.status(500).send(
            createBadResponse(ErrorName.CATCH_ERROR)
        )
    }
}

export const getOne = async (req: any, res: any) => {
    try {
        const status = await checkUserStatus(req.headers.authorization)

        if (!status) {
            res.status(401).send(
                createBadResponse(ErrorName.UNAUTHORIZED)
            )
            return
        }

        const {id} = req.params

        const user = await User.findOne({where: {id}})

        if (!user) {
            res.status(500).send(
                createBadResponse(ErrorName.INTERNAL_ERROR)
            )
            return
        }
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send(
            createBadResponse(ErrorName.INTERNAL_ERROR)
        )
    }
}
