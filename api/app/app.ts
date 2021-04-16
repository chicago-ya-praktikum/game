import express from 'express'
import bodyParser from 'body-parser'
import cors, {CorsOptions} from 'cors'
import {db} from './models/index'
import userRoutes from './routes/user.routes'
import recordRoutes from './routes/record.routes'

const app = express()

const corsOptions: CorsOptions = {
    origin: 'https://local.ya-praktikum.tech:5000',
    credentials: true
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

db.sequelize.sync({force: true}).then(() => {
})

app.get('/', (req: any, res: any) => {
    console.log(req)
    res.json({ message: 'Welcome to sokoban api'})
})

userRoutes(app)
recordRoutes(app)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
