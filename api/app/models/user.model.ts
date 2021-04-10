// import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
// @Table({
//     timestamps: false, // don't add 'created_at', 'updated_at'
//     paranoid: true,   // add 'deleted_at'
//     tableName: 'users'
// })
// export class User extends Model<User> {
//     constructor() {
//         super()
//     }
//     @AutoIncrement
//     @PrimaryKey
//     @Column(DataType.INTEGER)
//     id!: number;

//     @AllowNull(false)
//     @Column(DataType.STRING)
//     name!: string;
// }

export const userTable = (sequelize: { define: (arg0: string, arg1: { id: { type: any; primaryKey: boolean }; description: { type: any; }; published: { type: any; }; }) => any; }, Sequelize: { STRING: any; BOOLEAN: any; }) => {
    const User = sequelize.define("users", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return User;
  };