import {db} from '../models/index'
import {checkUserStatus, createBadResponse, ErrorName} from './utils/helpers'

const Reaction = db.reactions

export const getAll = async (req: any, res: any) => {
    try {
        const status = await checkUserStatus(req.headers.authorization)

        if (!status) {
            res.status(401).send(
                createBadResponse(ErrorName.UNAUTHORIZED)
            )
            return
        }

        const reactions = await Reaction.findAll()

        if (!reactions) {
            res.status(500).send(
                createBadResponse(ErrorName.INTERNAL_ERROR)
            )
            return
        }

        res.status(200).send(reactions)
    } catch (err) {
        res.status(500).send(
            createBadResponse(ErrorName.INTERNAL_ERROR)
        )
    }
}

export const getOne = async (req: any, res: any) => {
    try {
        const status = await checkUserStatus(req.headers.authorization)

        if (!status) {
            res.status(401).send(
                createBadResponse(ErrorName.INTERNAL_ERROR)
            )
            return
        }

        const reaction = await Reaction.findOne()

        if (!reaction) {
            res.status(500).send(
                createBadResponse(ErrorName.INTERNAL_ERROR)
            )
            return
        }

        res.status(200).send(reaction)
    } catch (err) {
        res.status(500).send(
            createBadResponse(ErrorName.INTERNAL_ERROR)
        )
    }
}
