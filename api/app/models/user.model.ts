import {DataTypes} from 'sequelize'
import {sequelize} from '../config/db.config'

export const userModel = sequelize.define('users', {
    displayName: {
        type: new DataTypes.STRING(32),
        allowNull: true
    },
    avatar: {
        type: new DataTypes.STRING(128),
        allowNull: true
    }
})
