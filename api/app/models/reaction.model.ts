export const reactionTable = (sequelize: any, Sequelize: any) => {
    const Reaction = sequelize.define('reactions', {
        iconName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Reaction
}
