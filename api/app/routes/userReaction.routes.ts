import {createOrRemove, getOne} from '../controllers/userReaction.controller'

const userReactionsRoutes = (app: any) => {
    const router = require('express').Router()

    router.post('/', createOrRemove)

    router.get('/:recordId', getOne)

    app.use('/api/userReactions', router)
};

export default userReactionsRoutes
