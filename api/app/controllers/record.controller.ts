import Validator from 'validatorjs'
import {db} from '../models/index'
import {checkUserStatus, createBadResponse, ErrorName} from './utils/helpers'
import {recordDataRules} from './utils/requestDataVaidators'

const Record = db.records

export const create = async (req: any, res: any) => {
    try {
        const status = await checkUserStatus(req.headers.authorization)

        if (!status) {
            res.status(401).send(
                createBadResponse(ErrorName.UNAUTHORIZED)
            )
            return
        }
        const validation = new Validator(req, recordDataRules)

        if (validation.fails()) {
            res.status(400).send(
                createBadResponse(ErrorName.WRONG_API)
            )
            return
        }

        const record = {
            userId: status,
            title: req.body.title,
            content: req.body.content
        }

        const newRecord = await Record.create(record)

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

export const update = async (req: any, res: any) => {
    try {
        const status = await checkUserStatus(req.headers.authorization)

        if (!status) {
            res.status(401).send(
                createBadResponse(ErrorName.UNAUTHORIZED)
            )
            return
        }
        const validation = new Validator(req, recordDataRules)

        if (validation.fails()) {
            res.status(400).send(
                createBadResponse(ErrorName.WRONG_API)
            )
            return
        }

        const {id, title, content} = req.body
        if (id) {
            const record = await Record.update(
                {
                    title,
                    content
                },
                {
                    where: {id}
                }
            )
            res.status(200).send(record)
            return
        }

        res.status(500).send(
            createBadResponse(ErrorName.INTERNAL_ERROR)
        )
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

        const records = await Record.findAll()

        if (!records) {
            res.status(500).send(
                createBadResponse(ErrorName.INTERNAL_ERROR)
            )
            return
        }
        res.status(200).send(records)
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
        const {id} = req.params

        const record = await Record.findOne({
            where: {id}
        })

        if (record === null) {
            res.status(404).send(
                createBadResponse(ErrorName.NOT_FOUND)
            )
            return
        }

        if (!record) {
            res.status(500).send(
                createBadResponse(ErrorName.INTERNAL_ERROR)
            )
            return
        }
        res.status(200).send({
            record,
            readOnly: status !== record.userId
        })
    } catch (err) {
        res.status(500).send(
            createBadResponse(ErrorName.INTERNAL_ERROR)
        )
    }
}

export const remove = async (req: any, res: any) => {
    try {
        const status = await checkUserStatus(req.headers.authorization)

        if (!status) {
            res.status(401).send(
                createBadResponse(ErrorName.UNAUTHORIZED)
            )
            return
        }
        const {id} = req.params

        const record = await Record.findOne({
            where: {id}
        })

        if (record === null) {
            res.status(404).send(
                createBadResponse(ErrorName.NOT_FOUND)
            )
        }

        if (!record) {
            res.status(500).send(
                createBadResponse(ErrorName.INTERNAL_ERROR)
            )
        }

        if (record.userId !== status) {
            res.status(403).send(
                createBadResponse(ErrorName.FORBIDDEN)
            )
        }

        const deleteStatus = await Record.destroy({
            where: {id}
        })
        if (deleteStatus !== 1) {
            res.status(404).send(
                createBadResponse(ErrorName.NOT_FOUND)
            )
        }

        res.status(200).send({
            message: 'Record was deleted successfully!'
        })
    } catch (err) {
        res.status(500).send(
            createBadResponse(ErrorName.INTERNAL_ERROR)
        )
    }
}
