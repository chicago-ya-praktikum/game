import {getAll, getOne} from '../controllers/reaction.controller'

const reactionRoutes = (app: any) => {
    const router = require('express').Router();

    router.get('/', getAll)

    router.get('/:id', getOne);

    app.use('/api/reactions', router);
};

export default reactionRoutes
