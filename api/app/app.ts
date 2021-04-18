import {db} from './models/index'
import userRoutes from './routes/user.routes'
import recordRoutes from './routes/record.routes'
import reactionRoutes from './routes/reaction.routes'
import userReactionsRoutes from './routes/userReaction.routes'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

export const app = express()

const corsOptions = {
    origin: 'https://localhost:5000'
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}))

db.sequelize.sync({force: true})
    // eslint-disable-next-line no-console
    .then(() => console.log('sequelize.sync OK'))
    // eslint-disable-next-line no-console
    .catch((err: any) => console.log('sequelize.sync error', err))

app.get('/', (req: any, res: any) => {
    // eslint-disable-next-line no-console
    console.log(req)
    res.json({message: 'Welcome to sokoban api'})
})

userRoutes(app)
recordRoutes(app)
reactionRoutes(app)
userReactionsRoutes(app)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${PORT}.`)
});
