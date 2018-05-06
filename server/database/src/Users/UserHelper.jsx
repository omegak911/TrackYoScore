// export { Games, Histories, HistoryConfirmation, Perks, Users, UserPerks, UserHistories, TempUserHistories };

import { Users, HistoryConfirmation } from '../../SQL/index';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

//add user
const createUserHelper = ({ username, password }, callback) => 
  Users.create({
    username,
    password,
    level: 1,
    currentEXP: 0,
    nextLevelEXP: 100,
    wins: 0,
    losses: 0,
  })
  .then((result) => callback(result))
  .catch(err => { 
    console.log(err);
  });

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

const validateUserHelper = ({ username, password }, callback) => 
  Users.findOne({
    where: { username, password },
    include: [{
        model: HistoryConfirmation,
        as: 'confirmationNeeded',
      }],
    attributes: { exclude: [ 'password', 'updatedAt'] }
  })
  .then(result => callback(result))
  .catch(err => console.log(err));

export { createUserHelper, searchUsersHelper, updateUserHelper, validateUserHelper };
