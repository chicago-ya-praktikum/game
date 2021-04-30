import {Request, Response, NextFunction} from 'express'
import {checkUserStatus, createBadResponse, ErrorName} from '../controllers/utils/helpers'

export const userStatusMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const status = await checkUserStatus(req.headers.authorization)

    if (status) {
        res.status(409).send(
            createBadResponse(ErrorName.AUTH_CONFLICT)
        )
    }

    next()
}
