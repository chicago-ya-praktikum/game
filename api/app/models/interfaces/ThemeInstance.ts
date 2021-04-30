import {Model, Optional} from 'sequelize'

interface ThemeAttributes {
    id?: number
    name: string
}

interface ThemeCreationAttributes extends Optional<ThemeAttributes, 'id'> {}

export interface ThemeInstance
    extends Model<ThemeAttributes, ThemeCreationAttributes>, ThemeAttributes {}
