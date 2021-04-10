export const recordTable = (sequelize: any, Sequelize: any) => {
    const Record = sequelize.define("records", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      parentId: {
          type: Sequelize.INTEGER
      },
      userId: {
          type: Sequelize.INTEGER
      },
      content: {
          type: Sequelize.STRING(1234)
      }
    });
  
    return Record;
  };