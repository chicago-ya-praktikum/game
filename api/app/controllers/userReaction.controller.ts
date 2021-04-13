import { checkUserStatus } from './utils/helpers'
import { db } from '../models/index'
import { isUserReactionData } from './utils/requestDataVaidators'

const UserReaction = db.userReactions

export const create = (req: any, res: any) => {
    if (!isUserReactionData(req)) {
        res.status(400).send({
            message: "Wrong API"
        });
        return;
    }

    checkUserStatus(req.headers.authorization)
        .then(data => {
            if (!data) {
                res.status(401).send('Unauthorized')
            } else {
                const userId = data.id

                const userReaction = {
                    reactionId: req.body.reactionId,
                    userId: userId,
                    recordId: req.body.recordId
                }

                UserReaction.findOne({
                    where: {
                        userId: userId,
                        reactionId: req.body.reactionId,
                        recordId: req.body.recordId
                    }
                })
                    .then((data: any) => {
                        if (data !== null) {
                            res.status(409).send('Reaction is already set')
                        } else {
                            UserReaction.create(userReaction)
                                .then(() => {
                                    res.status(201).send(data);
                                })
                                .catch((err: { message: any; }) => {
                                    res.status(500).send({
                                        message:
                                            err.message || "Some error occurred while creating the reaction."
                                    });
                                });
                        }
                    })
            }
        })

};

export const getAll = (req: any, res: any) => {
    checkUserStatus(req.headers.authorization)
        .then(data => {
            if (!data) {
                res.status(401).send('Unauthorized')
            } else {
                User.findAll()
                    .then((data: any) => {
                        res.status(200).send(data);
                    })
                    .catch((err: { message: any; }) => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while retrieving tutorials."
                        })
                    })
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
                User.findOne({ where: { id: id } })
                    .then((data: any) => {
                        res.status(200).send(data);
                    })
                    .catch((err: { message: any; }) => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while retrieving tutorials."
                        });
                    });
            }
        })
}
