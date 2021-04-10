import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const sequelizeOptions: SequelizeOptions = {
      host: 'localhost',
      port: 5436,
      username: 'chicago',
      password: 'password',
      database: 'sokobandb',

  dialect: 'postgres' // 'mysql', 'sqlite', 'mariadb', 'mssql'
};

export const sequelize: any = new Sequelize(sequelizeOptions);
