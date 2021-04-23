export const userTable = (sequelize: any, Sequelize: any) => {
    const User = sequelize.define('users', {
        displayName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: true
        }
    })

    return User
};
