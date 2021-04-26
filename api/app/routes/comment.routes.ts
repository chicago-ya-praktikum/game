import {Router} from 'express'
import {
    create, getComments
} from '../controllers/comment.controller'

export const commentRoutes = (app: any) => {
    const router = Router()
    router.post('/', create)
    router.get('/:recordId', getComments)
    app.use('/api/comments', router)
}
