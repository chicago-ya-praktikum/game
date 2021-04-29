import {DataTypes} from 'sequelize'
import {sequelize} from '../config/db.config'
import {userModel} from './user.model'

export const themeModel = sequelize.define('themes', {
    name: {
        type: new DataTypes.STRING(16),
        allowNull: false
    }
})

themeModel.belongsTo(userModel)
