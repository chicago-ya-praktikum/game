import {DataTypes} from 'sequelize'
import {sequelize} from '../config/db.config'

export const Token = sequelize.define('tokens', {
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        unique: true,
        allowNull: false
    },
    token: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
})
