// export { Games, Histories, HistoryConfirmation, Perks, Users, UserPerks, UserHistories, TempUserHistories };

import { Users, HistoryConfirmation } from '../../SQL/index';

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

//update
  // level: Sequelize.INTEGER,
  // currentEXP: Sequelize.INTEGER,
  // nextLevelEXP: Sequelize.INTEGER,
  // wins: Sequelize.INTEGER,
  // losses: Sequelize.INTEGER,

const updateUserHelper = ({ username, data }, callback) =>
  Users.update(
    data,
    {
      where: { username }
    }
  )
  .then(result => callback(result))
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

export { createUserHelper, updateUserHelper, validateUserHelper };
