//create functions to make and drop tables here
//then update setup file so we can build and drop ASYNC as needed
//create dummy data as needed

import Sequelize from 'sequelize';
import db from '../index';

const Games = db.define('games', {
  title: { type: Sequelize.STRING, unique: true },
});

const History = db.define('histories', {
  gameID: Sequelize.INTEGER,
  playerScore: Sequelize.JSON,
});

const HistoryConfirmation = db.define('confirmation', {
  gameID: Sequelize.INTEGER,
  playerScore: Sequelize.JSON,
})

const Perks = db.define('perks', {
  type: { type: Sequelize.STRING, unique: true },
});

const Users = db.define('users', {
  name: { type: Sequelize.STRING, unique: true },
  password: Sequelize.STRING,
  level: Sequelize.INTEGER,
  currentEXP: Sequelize.INTEGER,
  nextLevelEXP: Sequelize.INTEGER,
  wins: Sequelize.INTEGER,
  losses: Sequelize.INTEGER,
});

export { Games, History, HistoryConfirmation, Perks, Users };
