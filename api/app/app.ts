import 'colors'
import cors, {CorsOptions} from 'cors'
import {db} from './models/index'
import userRoutes from './routes/user.routes'
import recordRoutes from './routes/record.routes'
import reactionRoutes from './routes/reaction.routes'
import userReactionsRoutes from './routes/userReaction.routes'
import {commentRoutes} from './routes/comment.routes'
import {fillInByDefault} from './controllers/utils/fillInByDefault'

const express = require('express')
const bodyParser = require('body-parser')

export const app = express()

const corsOptions: CorsOptions = {
    origin: '*',
    credentials: true
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

db.sequelize.sync({force: true})
    .then(() => {
        // eslint-disable-next-line no-console
        console.log('Sequelize.sync OK'.green)
        fillInByDefault(db)
    })
    // eslint-disable-next-line no-console
    .catch((err: any) => console.log('Sequelize.sync ERROR'.red, err))

app.get('/', (req: any, res: any) => {
    // eslint-disable-next-line no-console
    console.log(req)
    res.json({message: 'Welcome to sokoban api'})
})

userRoutes(app)
recordRoutes(app)
commentRoutes(app)
reactionRoutes(app)
userReactionsRoutes(app)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${PORT}.`)
})
