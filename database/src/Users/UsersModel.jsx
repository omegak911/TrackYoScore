import Sequelize from 'sequelize';
import SQL_database from '../index';

const Users = SQL_database.define('users', {
  username: { type: Sequelize.STRING, unique: true },
  password: Sequelize.STRING,
  email: { type: Sequelize.STRING, unique: true },
  wins: Sequelize.Number,
  loses: Sequelize.Number,
})