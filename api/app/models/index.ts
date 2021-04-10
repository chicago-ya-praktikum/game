
const Sequelize = require('sequelize')
import {sequelize} from '../config/db.config'
import { userTable } from './user.model'
// import {User} from './user.model'

export const db:any = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// db.users = new (User)(sequelize, Sequelize)
// db.users = sequelize.define(User)
db.users = userTable(sequelize, Sequelize)
