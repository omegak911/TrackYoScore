//create functions to make and drop tables here
//then update setup file so we can build and drop ASYNC as needed
//create dummy data as needed

import Sequelize from 'sequelize';
import db from '../index';

const Games = db.define('games', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: Sequelize.STRING, unique: true, allowNull: false },
  image: { type: Sequelize.STRING, allowNull: false },
  }, {
    timestamps: false,
  });

const Histories = db.define('histories', {
  gameId: Sequelize.INTEGER,
  playerScore: Sequelize.JSON,
  createdAt: { type: Sequelize.DATE, defaultValue: new Date()},
  }, {
    timestamps: true,
    updatedAt: false,
  });

Games.hasMany(Histories);
Histories.belongsTo(Games);

const HistoryConfirmation = db.define('confirmations', {
  gameId: Sequelize.INTEGER,
  playerScore: Sequelize.JSON,
  validation: Sequelize.INTEGER,
  createdAt: { type: Sequelize.DATE, defaultValue: new Date()},
  }, {
    timestamps: true,
    updatedAt: false,
  });

const Perks = db.define('perks', {
  type: { type: Sequelize.STRING, unique: true },
});

const Users = db.define('users', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: Sequelize.STRING(40), unique: true, allowNull: false, len: [2,50] },
  password: { type: Sequelize.STRING(), allowNull: false },
  //eventually add email
  url: { type: Sequelize.STRING, defaultValue: 'https://scontent-ort2-2.cdninstagram.com/vp/fd241f48afc0d7552ac99ea87b6a3835/5BC63862/t51.2885-15/s640x640/sh0.08/e35/22802663_448636875537575_8141256937888022528_n.jpg'},
  level: { type: Sequelize.INTEGER, defaultValue: 1 },
  currentEXP: { type: Sequelize.INTEGER, defaultValue: 0 },
  nextLevelEXP: { type: Sequelize.INTEGER, defaultValue: 100 },
  wins: { type: Sequelize.INTEGER, defaultValue: 0 },
  losses: { type: Sequelize.INTEGER, defaultValue: 0 }, 
  createdAt: { type: Sequelize.DATE, defaultValue: new Date()},
  }, {
    timestamps: true,
    updatedAt: false,
  });

const FriendRequests = db.define('friend_requests', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  friendId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
  }, {
    timestamps: false,
  })
Users.belongsToMany(Users, { through: FriendRequests, as: 'friendRequests', foreignKey: 'userId' });
Users.belongsToMany(Users, { through: FriendRequests, as: 'requestee', foreignKey: 'friendId' });

const UserPerks = db.define('user_perks', {});
Users.belongsToMany(Perks, { through: UserPerks, as: 'perk' });
Perks.belongsToMany(Users, { through: UserPerks });

const UserHistories = db.define('user_histories', {}, { timestamps: false });
// Users.belongsToMany(Histories, { through: UserHistories, as: 'challengeHistory' });
// Histories.belongsToMany(Users, { through: UserHistories });
Histories.hasMany(UserHistories);
UserHistories.belongsTo(Histories);
UserHistories.belongsTo(Users);

const UserHistoryConfirmations = db.define('user_confirmations', {}, { timestamps: false });
Users.belongsToMany(HistoryConfirmation, { through: UserHistoryConfirmations, as: 'confirmationNeeded' });
HistoryConfirmation.belongsToMany(Users, { through: UserHistoryConfirmations });
UserHistoryConfirmations.belongsTo(HistoryConfirmation);
Games.hasMany(HistoryConfirmation);
HistoryConfirmation.belongsTo(Games);

const Friends = db.define('friends', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  }, { timestamps: false });
Users.belongsToMany(Users, { through: Friends, as: 'friendsList', foreignKey: 'userId' });
Users.belongsToMany(Users, { through: Friends, as: 'user', foreignKey: 'friendId' });

export { FriendRequests, Friends, Games, Histories, HistoryConfirmation, Perks, Users, UserPerks, UserHistories, UserHistoryConfirmations };
