import Validator from 'validatorjs'
import {checkUserStatus, createBadResponse, ErrorName} from './utils/helpers'
import {db} from '../models/index'
import {userReactionDataRules} from './utils/requestDataVaidators'

const UserReaction = db.userReactions

export const create = async (req: any, res: any) => {
    try {
        const status = await checkUserStatus(req.headers.authorization)

        if (!status) {
            res.status(401).send(
                createBadResponse(ErrorName.UNAUTHORIZED)
            )
            return
        }

        const validation = new Validator(req, userReactionDataRules)

        if (validation.fails()) {
            res.status(400).send(
                createBadResponse(ErrorName.WRONG_API)
            )
            return
        }

        const recordId = req.params.id

        const userReaction = {
            reactionId: req.body.reactionId,
            userId: status,
            recordId
        }

        const recordUserReaction = await UserReaction.findOne({
            where: {
                reactionId: req.body.reactionId,
                userId: status,
                recordId
            }
        })

        if (recordUserReaction !== null) {
            res.status(409).send(
                createBadResponse(ErrorName.RECORD_REACTION_CONFLICT)
            )
        }

        const newRecordUserReaction = await UserReaction.create(userReaction)

        if (!newRecordUserReaction) {
            res.status(500).send(
                createBadResponse(ErrorName.INTERNAL_ERROR)
            )
        }

        res.status(201).send(newRecordUserReaction)
    } catch (err) {
        res.status(500).send(
            createBadResponse(ErrorName.INTERNAL_ERROR)
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

        const {id} = req.params

        const recordReactionsList = await UserReaction.findAll({
            where: {
                recordId: id
            }
        })

        if (!recordReactionsList) {
            res.status(500).send(
                createBadResponse(ErrorName.INTERNAL_ERROR)
            )
            return
        }
        res.status(200).send(recordReactionsList)
    } catch (err) {
        res.status(500).send(
            createBadResponse(ErrorName.INTERNAL_ERROR)
        )
    }
}
