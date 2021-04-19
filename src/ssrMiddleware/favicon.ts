import {Request, Response} from 'express'

export const favicon = async (req: Request, res: Response) => {
    res.status(200).send(null)
}
