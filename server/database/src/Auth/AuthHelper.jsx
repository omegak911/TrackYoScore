import { Users, HistoryConfirmation } from '../../SQL/index';
import Sequelize from 'sequelize';

const createUserHelper = ({ username, password }, callback) =>
  Users.create({
    username,
    password,
    level: 1,
    currentEXP: 0,
    nextLevelEXP: 100,
    url: 'https://scontent-ort2-2.cdninstagram.com/vp/fd241f48afc0d7552ac99ea87b6a3835/5BC63862/t51.2885-15/s640x640/sh0.08/e35/22802663_448636875537575_8141256937888022528_n.jpg',
    wins: 0,
    losses: 0,
  })
  .then(({ dataValues }) => callback())
  .catch(err => { 
    console.log(err);
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
