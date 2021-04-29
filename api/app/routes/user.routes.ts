import {Express, Router} from 'express'
import {create, getAll, getOne} from '../controllers/user.controller'

export const userRoutes = (app: Express) => {
    const router = Router()

    router.post('/', create);
    router.get('/', getAll)
    router.get('/:id', getOne)

    app.use('/api/users', router)
}
