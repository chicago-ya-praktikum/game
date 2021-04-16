import {db} from '../models/index'
import {checkUserStatus} from './utils/helpers'

const Reaction = db.reactions

export const getAll = async (req: any, res: any) => {
    const status = await checkUserStatus(req.headers.authorization)

    if (!status) {
        res.status(401).send('Unauthorized')
        return
    }

    const reactions = await Reaction.findAll()

    if (!reactions) {
        res.status(500).send({
            message: 'Some error occurred while reading the list of reactions.'
        })
        return
    }

    res.status(200).send(reactions)
}

export const getOne = async (req: any, res: any) => {
    const status = await checkUserStatus(req.headers.authorization)

    if (!status) {
        res.status(401).send('Unauthorized')
        return
    }

    const reaction = await Reaction.findOne()

    if (!reaction) {
        res.status(500).send({
            message: 'Some error occurred while reading attributes of reaction.'
        })
        return
    }

    res.status(200).send(reaction)
}
