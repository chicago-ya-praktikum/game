
const Sequelize = require('sequelize')
import {sequelize} from '../config/db.config'
import { userTable } from './user.model'

export const db:any = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = userTable(sequelize, Sequelize)
