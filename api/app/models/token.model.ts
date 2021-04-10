export const tokenTable = (sequelize: any, Sequelize: any) => {
    const Token = sequelize.define("tokens", {
      userId: {
        type: Sequelize.INTEGER,
        unique: true
      },
      token: {
          type: Sequelize.STRING
      }
    });
  
    return Token;
  };