import {Express, Router} from 'express'
import {
    create, getAll, getOne, setTheme, theme
} from '../controllers/user.controller'

export const userRoutes = (app: Express) => {
    const router = Router()

    router.post('/', create)
    router.get('/', getAll)
    router.get('/:id', getOne)

    app.get('/api/users/theme', theme)
    app.post('/api/users/theme', setTheme)
    app.use('/api/users', router)
}
