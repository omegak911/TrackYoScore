import { Users, HistoryConfirmation } from '../../SQL/index';
import Sequelize from 'sequelize';

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

const validateUserHelper = ({ username, password }, callback) => 
  Users.findOne({
    where: { username, password },
    include: [{
        model: HistoryConfirmation,
        as: 'confirmationNeeded',
      }, {
        model: Users,
        as: 'friendRequests',
        attributes: ['id', 'username'],
      },
      {
        model: Users,
        as: 'friendsList',
        attributes: ['id', 'username'],
      },
    ],
    attributes: { exclude: [ 'password', 'updatedAt'] }
  })
  .then(result => callback(result))
  .catch(err => console.log(err));

export { createUserHelper, validateUserHelper };
