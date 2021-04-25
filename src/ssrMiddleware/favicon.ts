import {Request, Response} from 'express'

export const favicon = async (_: Request, res: Response) => {
    res.status(200).send(null)
}
