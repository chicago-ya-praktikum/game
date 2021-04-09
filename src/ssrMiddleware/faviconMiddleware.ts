import {Request, Response} from 'express'

export const faviconMiddleware = async (req: Request, res: Response) => {
    console.log('faviconMiddleware', req.url)
    res.status(200).send(null)
}
