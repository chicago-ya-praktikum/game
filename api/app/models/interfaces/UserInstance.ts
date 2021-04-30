import {Model, Optional} from 'sequelize'
import {ThemeInstance} from './ThemeInstance'

interface UserAttributes {
    id?: number
    displayName: string
    avatar: string
    themeId: number
    theme?: ThemeInstance
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}
