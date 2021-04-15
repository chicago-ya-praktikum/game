import {db} from '../models/index'
import {checkUserStatus} from './utils/helpers'
import {isRecordData} from './utils/requestDataVaidators'

const Record = db.records

export const create = async (req: any, res: any) => {
    if (!isRecordData(req)) {
        res.status(400).send({
            message: 'Wrong API'
        });
        return;
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

export const getAll = (req: any, res: any) => {
    checkUserStatus(req.headers.authorization)
        .then(data => {
            if (!data) {
                res.status(401).send('Unauthorized')
            } else {
                Record.findAll()
                    .then((data: any) => {
                        res.status(200).send(data);
                    })
                    .catch((err: {message: any;}) => {
                        res.status(500).send({
                            message:
                err.message || 'Some error occurred while retrieving tutorials.'
                        });
                    });
            }
        })
};

export const getOne = (req: any, res: any) => {
    checkUserStatus(req.headers.authorization)
        .then(data => {
            if (!data) {
                res.status(401).send('Unauthorized')
            } else {
                const {id} = req.params
                Record.findOne({where: {id}})
                    .then((data: any) => {
                        if (data === null) {
                            res.status(404).send('Record not found')
                        }
                        res.status(200).send(data);
                    })
                    .catch((err: {message: any;}) => {
                        res.status(500).send({
                            message:
                err.message || 'Some error occurred while retrieving tutorials.'
                        });
                    });
            }
        })
};

export const remove = (req: any, res: any) => {
    checkUserStatus(req.headers.authorization)
        .then(data => {
            if (!data) {
                res.status(401).send('Unauthorized')
            } else {
                const userId = data
                const {id} = req.params

                Record.findOne({
                    where: {
                        id
                    }
                })
                    .then((data: {userId: any}) => {
                        if (data.userId !== userId) {
                            res.status(403).send('Forbidden')
                        } else {
                            Record.destroy({
                                where: {id}
                            })
                                .then((num: number) => {
                                    if (num == 1) {
                                        res.send({
                                            message: 'Record was deleted successfully!'
                                        });
                                    } else {
                                        res.status(404).send({
                                            message: `Cannot delete Record with id=${id}. Maybe Tutorial was not found!`
                                        });
                                    }
                                })
                                .catch((err: any) => {
                                    console.log(err)
                                    res.status(500).send({
                                        message: `Could not delete Record with id= + ${id}`
                                    });
                                });
                        }
                    })
            }
        })
};
