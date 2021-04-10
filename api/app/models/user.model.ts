export const userTable = (sequelize: any, Sequelize: any) => {
    const User = sequelize.define("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      displayName: {
          type: Sequelize.STRING
      },
      avatar: {
          type: Sequelize.STRING
      }
    });
  
    return User;
  };