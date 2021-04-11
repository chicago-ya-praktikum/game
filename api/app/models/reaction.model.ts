export const reactionTable = (sequelize: any, Sequelize: any) => {
    const Reaction = sequelize.define("reactions", {
      title: {
          type: Sequelize.STRING,
          allowNull: false
      },
      content: {
          type: Sequelize.STRING,
          allowNull: false
      }
    });
  
    return Reaction;
  };