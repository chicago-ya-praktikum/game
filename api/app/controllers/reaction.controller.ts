import { db } from '../models/index'
import { checkUserStatus } from './utils/helpers'

const Reaction = db.reactions

export const getAll = (req: any, res: any) => {
    checkUserStatus(req.headers.authorization)
        .then(data => {
            if (!data) {
                res.status(401).send('Unauthorized')
            } else {
                Reaction.findAll()
                    .then((data: any) => {
                        res.status(200).send(data);
                    })
                    .catch((err: { message: any; }) => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while reading the list of reactions."
                        });
                    });
            }
        })
}

export const getOne = (req: any, res: any) => {
    checkUserStatus(req.headers.authorization)
        .then(data => {
            if (!data) {
                res.status(401).send('Unauthorized')
            } else {
                const id = req.params.id
                Reaction.findOne({where: {id: id}})
                    .then((data: any) => {
                        res.status(200).send(data)
                    })
                    .catch((err: { message: any; }) => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while reading attributes of a reaction."
                        })
                    })
            }

        })
}
