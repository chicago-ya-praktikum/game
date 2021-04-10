export const userTable = (sequelize: any, Sequelize: any) => {
    const User = sequelize.define("users", {
      userId: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false
      },
      displayName: {
          type: Sequelize.STRING,
          allowNull: true
      },
      avatar: {
          type: Sequelize.STRING,
          allowNull: true
      }
    });
  
    return User;
  };