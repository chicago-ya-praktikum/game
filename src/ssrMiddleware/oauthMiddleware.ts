import {Request, Response} from 'express'

export const oauthMiddleware = async (req: Request, res: Response, next: any) => {
    console.log('oauthMiddleware', req.url, next)
    next()
}
