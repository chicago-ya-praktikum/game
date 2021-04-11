import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const sequelizeOptions: SequelizeOptions = {
    username: 'postgres',
    host: 'localhost',
    database: 'sokobandb',
    password: 'password',
    port: 4005,

    dialect: 'postgres'
};

const sequelize = new Sequelize(sequelizeOptions);