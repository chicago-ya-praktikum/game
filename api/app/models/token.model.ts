export const tokenTable = (sequelize: any, Sequelize: any) => {
    const Token = sequelize.define('tokens', {
        userId: {
            type: Sequelize.INTEGER,
            unique: true,
            allowNull: false
        },
        token: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Token;
};
