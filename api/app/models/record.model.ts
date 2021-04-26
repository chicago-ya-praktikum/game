export const recordTable = (sequelize: any, Sequelize: any) => {
    const Record = sequelize.define('records', {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING(1234),
            allowNull: false
        }
    })

    return Record
}
