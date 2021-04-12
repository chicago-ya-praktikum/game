import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const sequelizeOptions: SequelizeOptions = {
      host: 'localhost',
      port: 5436,
      username: 'chicago',
      password: 'password',
      database: 'sokobandb',

  dialect: 'postgres', // 'mysql', 'sqlite', 'mariadb', 'mssql'
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export const sequelize: any = new Sequelize(sequelizeOptions);
