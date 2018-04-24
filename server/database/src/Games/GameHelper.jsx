import { Games } from '../../SQL/index';

const addGameHelper = ({ title, image }, callback) =>
  Games
    .create({
      title,
      image,
    })
    .then(result => callback(result))
    .catch(err => callback(err));

const fetchGameHelper = (callback) =>
  Games
    .findAll({})
    .then(result => callback(result))
    .catch(err => callback(err));

export { addGameHelper, fetchGameHelper };