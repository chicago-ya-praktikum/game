import Types from 'sequelize'
import {Sequelize} from 'sequelize/types'

export const commentsTable = (sequelize: Sequelize) => {
    const Comments = sequelize.define('comments', {
        parentId: {
            type: Types.INTEGER,
            allowNull: true
        },
        userId: {
            type: Types.INTEGER,
            allowNull: false
        },
        content: {
            type: Types.STRING(1234),
            allowNull: false
        }
    })

    return Comments
}