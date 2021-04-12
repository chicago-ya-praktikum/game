export const userReactionTable = (sequelize: any, Sequelize: any) => {
    const UserReaction = sequelize.define("userReactions", {
      reactionId: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      userId: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      recordId: {
          type: Sequelize.INTEGER,
          allowNull: false
      },      
    });
  
    return UserReaction;
  };