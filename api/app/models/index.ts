import Sequelize from 'sequelize'
import {sequelize} from '../config/db.config'
import {userTable} from './user.model'
import {tokenTable} from './token.model'
import {recordTable} from './record.model'
import {reactionTable} from './reaction.model'
import {userReactionTable} from './usersReactions.model'
import {commentsTable} from './comment.model'

export const db:any = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = userTable(sequelize, Sequelize)
db.tokens = tokenTable(sequelize, Sequelize)
db.reactions = reactionTable(sequelize, Sequelize)
db.records = recordTable(sequelize, Sequelize)
db.userReactions = userReactionTable(sequelize, Sequelize)
db.comments = commentsTable(sequelize)

db.users.hasMany(db.records)
db.records.belongsTo(db.users)
db.users.hasMany(db.comments)
db.comments.belongsTo(db.users)
db.users.hasMany(db.tokens)
db.users.hasMany(db.userReactions)

db.records.hasMany(db.comments)
db.records.hasMany(db.userReactions)

db.reactions.hasMany(db.userReactions)
