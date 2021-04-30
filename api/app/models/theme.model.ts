import {DataTypes} from 'sequelize'
import {sequelize} from '../config/db.config'
import {ThemeInstance} from './interfaces/ThemeInstance'

export const themeModel = sequelize.define<ThemeInstance>('themes', {
    name: {
        type: new DataTypes.STRING(16),
        allowNull: false
    }
})
