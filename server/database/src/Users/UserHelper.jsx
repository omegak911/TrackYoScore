// export { Games, Histories, HistoryConfirmation, Perks, Users, UserPerks, UserHistories, TempUserHistories };

import { FriendRequests, Friends, Users, HistoryConfirmation } from '../../SQL/index';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

const searchUsersHelper = ({ username }, callback) =>
  Users.findAll({
    attributes: ['username', 'id'],
    limit: 20,
    where: {
      username: {
        [Op.like]: `%${username}%`
      }
    },
    raw: true,
  })
  .then(result => callback(result))
  .catch(err => console.log(err));

//update
  // level: Sequelize.INTEGER,
  // currentEXP: Sequelize.INTEGER,
  // nextLevelEXP: Sequelize.INTEGER,
  // wins: Sequelize.INTEGER,
  // losses: Sequelize.INTEGER,

const updateUserHelper = (id, data, callback) =>
  Users.increment(
    data,
    {
      where: { id },
      returning: true,
      plain: true,
      // attributes: { exclude: [ 'password', 'createdAt', 'updatedAt'] }
    }
  )
  .then(result => callback(result[0][0]))
  .catch(err => console.log(err))

const userProfileHelper = ({ id }, callback) =>
  Users.findOne({
    where: { id },
    attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'currentEXP', 'nextLevelEXP']},
    plain: true,
  })
  .then(result => callback(result))
  .catch(err => console.log(err));

export { searchUsersHelper, updateUserHelper, userProfileHelper };
