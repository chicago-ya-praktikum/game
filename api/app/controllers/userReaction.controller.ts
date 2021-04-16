import Validator from 'validatorjs'
import {checkUserStatus} from './utils/helpers'
import {db} from '../models/index'
import {userReactionDataRules} from './utils/requestDataVaidators'

const UserReaction = db.userReactions

export const create = async (req: any, res: any) => {
    const status = await checkUserStatus(req.headers.authorization)

    if (!status) {
        res.status(401).send('Unauthorized')
        return
    }

    const validation = new Validator(req, userReactionDataRules)

    if (validation.fails()) {
        res.status(400).send({
            message: 'Wrong API'
        });
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
        res.status(409).send('Reaction is already set')
    }

    const newRecordUserReaction = await UserReaction.create(userReaction)

    if (!newRecordUserReaction) {
        res.status(500).send({
            message: 'Some error occurred while creating the reaction.'
        })
    }

    res.status(201).send(newRecordUserReaction)
}

export const getAll = async (req: any, res: any) => {
    const status = await checkUserStatus(req.headers.authorization)

    if (!status) {
        res.status(401).send('Unauthorized')
        return
    }

    const {id} = req.params

    const recordReactionsList = await UserReaction.findAll({
        where: {
            recordId: id
        }
    })

    if (!recordReactionsList) {
        res.status(500).send({
            message: 'Some error occurred while retrieving tutorials.'
        })
        return
    }
    res.status(200).send(recordReactionsList)
}
