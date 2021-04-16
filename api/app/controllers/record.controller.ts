import {db} from '../models/index'
import {checkUserStatus} from './utils/helpers'
import {isRecordData} from './utils/requestDataVaidators'

const Record = db.records

export const create = async (req: any, res: any) => {
    if (!isRecordData(req)) {
        res.status(400).send({
            message: 'Wrong API'
        });
        return
    }

    const status = await checkUserStatus(req.headers.authorization)

    if (!status) {
        res.status(401).send('Unauthorized')
        return
    }

    const record = {
        userId: status,
        parentId: req.body.parentId,
        title: req.body.title,
        content: req.body.content
    }

    const newRecord = await Record.create(record)

    if (!newRecord) {
        res.status(500).send({
            message: 'Some error occurred while creating the record.'
        })
        return
    }
    res.status(201).send(newRecord)
}

export const getAll = async (req: any, res: any) => {
    const status = await checkUserStatus(req.headers.authorization)

    if (!status) {
        res.status(401).send('Unauthorized')
        return
    }

    const records = await Record.findAll()

    if (!records) {
        res.status(500).send({
            message: 'Some error occurred while reading list of records.'
        })
        return
    }
    res.status(200).send(records)
}

export const getOne = async (req: any, res: any) => {
    const status = await checkUserStatus(req.headers.authorization)

    if (!status) {
        res.status(401).send('Unauthorized')
        return
    }
    const {id} = req.params

    const record = await Record.findOne({
        where: {id}
    })

    if (record === null) {
        res.status(404).send({
            message: 'Record not found'
        })
        return
    }

    if (!record) {
        res.status(500).send({
            message: 'Some error occurred while reading attributes of record.'
        })
        return
    }
    res.status(200).send(record)
};

export const remove = async (req: any, res: any) => {
    const status = await checkUserStatus(req.headers.authorization)

    if (!status) {
        res.status(401).send('Unauthorized')
        return
    }
    const {id} = req.params

    const record = await Record.findOne({
        where: {id}
    })

    if (record === null) {
        res.status(404).send({
            message: 'Record not found'
        })
    }

    if (!record) {
        res.status(500).send({
            message: 'Some error occurred while reading attributes of record.'
        })
    }

    if (record.userId !== status) {
        res.status(403).send('Forbidden')
    }

    const deleteStatus = await Record.destroy({
        where: {id}
    })
    if (deleteStatus !== 1) {
        res.status(404).send({
            message: `Cannot delete Record with id=${id} for some reason`
        })
    }

    res.send({
        message: 'Record was deleted successfully!'
    })
}
