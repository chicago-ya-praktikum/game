export const userTable = (sequelize: any, Sequelize: any) => {
    const User = sequelize.define("users", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      }
    });
  
    return User;
  };