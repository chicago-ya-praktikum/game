import Types from 'sequelize'
import {Sequelize} from 'sequelize/types'

const model = {
    userId: {
        type: Types.INTEGER,
        allowNull: false
    },
    recordId: {
        type: Types.INTEGER,
        allowNull: false
    },
    parentId: {
        type: Types.INTEGER,
        allowNull: true
    },
    content: {
        type: Types.STRING(1234),
        allowNull: false
    }
}

export type Model = typeof model

export const commentsTable = (sequelize: Sequelize) => sequelize.define('comments', model)
