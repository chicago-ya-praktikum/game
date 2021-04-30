import {DataTypes} from 'sequelize'
import {sequelize} from '../config/db.config'
import {themeModel} from './theme.model'
import {UserInstance} from './interfaces/UserInstance'

export const userModel = sequelize.define<UserInstance>('users', {
    displayName: {
        type: new DataTypes.STRING(32),
        allowNull: true
    },
    avatar: {
        type: new DataTypes.STRING(128),
        allowNull: true
    },
    themeId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1
    }
})

userModel.belongsTo(themeModel, {
    foreignKey: {
        allowNull: false,
        defaultValue: 1
    },
    onDelete: 'CASCADE'
})

themeModel.hasMany(userModel, {
    foreignKey: {
        allowNull: false,
        defaultValue: 1
    },
    onDelete: 'CASCADE'
})
