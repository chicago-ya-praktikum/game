import Validator from 'validatorjs'
import Sequelize from 'sequelize'
import {checkUserStatus, createBadResponse, ErrorName} from './utils/helpers'
import {db} from '../models/index'
import {userReactionDataRules} from './utils/requestDataVaidators'

const UserReaction = db.userReactions

export const createOrRemove = async (req: any, res: any) => {
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

        const foundItem = await UserReaction.findOne({
            where: {
                reactionId: req.body.reactionId,
                userId: status,
                recordId: req.body.recordId
            }
        })

        if (foundItem) {
            await UserReaction.destroy({
                where: {
                    reactionId: req.body.reactionId,
                    userId: status,
                    recordId: req.body.recordId
                }
            })
            res.status(200).send({
                message: 'User emotion was deleted successfully!',
                item: foundItem
            })
        } else {
            const newItem = await UserReaction.create({
                reactionId: req.body.reactionId,
                userId: status,
                recordId: req.body.recordId
            })
            res.status(201).send(newItem)
        }
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
                createBadResponse(ErrorName.UNAUTHORIZED)
            )
            return
        }

        const {recordId} = req.params

        const itemsActive = await UserReaction.findAll({
            where: {
                recordId
            },
            group: ['reactionId'],
            attributes: [
                'reactionId',
                [Sequelize.fn('COUNT', Sequelize.col('userId')), 'count_userId']
            ]
        })

        const itemsUser = await UserReaction.findAll({
            where: {
                recordId,
                userId: status
            },
            attributes: [
                'reactionId'
            ]
        })

        const user = itemsUser.map((item: {reactionId: number}) => item.reactionId)

        if (!itemsActive) {
            res.status(500).send(
                createBadResponse(ErrorName.INTERNAL_ERROR)
            )
            return
        }
        res.status(200).send({
            common: itemsActive,
            user
        })
    } catch (err) {
        res.status(500).send(
            createBadResponse(ErrorName.INTERNAL_ERROR)
        )
    }
}
