import {sequelize} from '../config/db.config'
import {Sequelize} from 'sequelize'
import User from './user.model'

const db:any = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = new (User)(sequelize, Sequelize)

export default db