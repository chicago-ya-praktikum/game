import Validator from 'validatorjs'
import {db} from '../models/index'
import {checkUserStatus, createBadResponse, ErrorName} from './utils/helpers'
import {commentDataRules} from './utils/requestDataVaidators'
import {Model} from '../models/comment.model'

const Comments = db.comments

export const create = async (req: any, res: any) => {
    try {
        const status = await checkUserStatus(req.headers.authorization)

        if (!status) {
            res.status(401).send(
                createBadResponse(ErrorName.UNAUTHORIZED)
            )
            return
        }
        const validation = new Validator(req, commentDataRules)

        if (validation.fails()) {
            res.status(400).send(
                createBadResponse(ErrorName.WRONG_API)
            )
            return
        }

        const record: Model = {
            userId: status,
            recordId: req.body.recordId,
            parentId: req.body.parentId,
            content: req.body.content
        }

        const newRecord = await Comments.create(record)

        if (!newRecord) {
            res.status(500).send(
                createBadResponse(ErrorName.INTERNAL_ERROR)
            )
            return
        }
        res.status(201).send(newRecord)
    } catch (err) {
        res.status(500).send(
            createBadResponse(ErrorName.INTERNAL_ERROR)
        )
    }
}

export const getComments = async (req: any, res: any) => {
    try {
        const status = await checkUserStatus(req.headers.authorization)

        if (!status) {
            res.status(401).send(
                createBadResponse(ErrorName.UNAUTHORIZED)
            )
            return
        }

        const {recordId} = req.params

        const comments = await Comments.findAll({
            where: {
                recordId
            }
            // attributes: ['id', 'name']
        })

        if (!comments) {
            res.status(500).send(
                createBadResponse(ErrorName.INTERNAL_ERROR)
            )
            return
        }
        res.status(200).send(comments)
    } catch (err) {
        res.status(500).send(
            createBadResponse(ErrorName.INTERNAL_ERROR)
        )
    }
}
