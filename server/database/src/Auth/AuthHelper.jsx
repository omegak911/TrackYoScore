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
  .then(({ dataValues }) => callback())
  .catch(err => { 
    callback('invalid username');
  });

const validateUserHelper = (username, callback) => 
  Users.findOne({
    where: { username },
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
    attributes: { exclude: ['updatedAt'] }
  })
  .then((result) => callback(null, result))
  .catch(err => callback(err, null));

export { createUserHelper, validateUserHelper };
