//create functions to make and drop tables here
//then update setup file so we can build and drop ASYNC as needed
//create dummy data as needed

import Sequelize from 'sequelize';
import db from '../index';

const Games = db.define('games', {
  title: { type: Sequelize.STRING, unique: true, allowNull: false },
  image: { type: Sequelize.STRING, allowNull: false },
});

const Histories = db.define('histories', {
  gameId: Sequelize.INTEGER,
  playerScore: Sequelize.JSON,
});

const HistoryConfirmation = db.define('confirmation', {
  gameId: Sequelize.INTEGER,
  playerScore: Sequelize.JSON,
  validation: Sequelize.INTEGER,
})

const Perks = db.define('perks', {
  type: { type: Sequelize.STRING, unique: true },
});

const Users = db.define('users', {
  username: { type: Sequelize.STRING(15), unique: true, allowNull: false },
  password: { type: Sequelize.STRING(15), allowNull: false },
  //eventually add email
  level: Sequelize.INTEGER,
  currentEXP: Sequelize.INTEGER,
  nextLevelEXP: Sequelize.INTEGER,
  wins: Sequelize.INTEGER,
  losses: Sequelize.INTEGER,
});

const FriendRequests = db.define('friend_requests', {
  requestorId: Sequelize.INTEGER,
  requesteeId: Sequelize.INTEGER,
})

//join tables

const UserPerks = db.define('user_perks', {});
Users.belongsToMany(Perks, { through: UserPerks, as: 'perk' });
Perks.belongsToMany(Users, { through: UserPerks });

const UserHistories = db.define('user_histories', {});
Users.belongsToMany(Histories, { through: UserHistories, as: 'challengeHistory' });
Histories.belongsToMany(Users, { through: UserHistories });

const UserHistoryConfirmations = db.define('user_confirmations', {});
Users.belongsToMany(HistoryConfirmation, { through: UserHistoryConfirmations, as: 'confirmationNeeded' });
HistoryConfirmation.belongsToMany(Users, { through: UserHistoryConfirmations });
HistoryConfirmation.hasMany(Games);

const Friends = db.define('friends', {});
Users.belongsToMany(Users, { through: Friends, as: 'userOne', foreignKey: 'userOneId' });
Users.belongsToMany(Users, { through: Friends, as: 'userTwo', foreignKey: 'userTwoId' });

export { FriendRequests, Friends, Games, Histories, HistoryConfirmation, Perks, Users, UserPerks, UserHistories, UserHistoryConfirmations };
