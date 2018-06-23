import { Games } from '../../SQL/index';

const addGameHelper = ({ title, image }, callback) =>
  Games
    .create({
      title,
      image,
    })
    .then(result => callback(result))
    .catch(err => console.log('addGameHelper error: ', err.original.detail));

const fetchGameHelper = (callback) =>
  Games
    .findAll({})
    .then(result => callback(result))
    .catch(err => console.log('fetchGameHelper error'));

export { addGameHelper, fetchGameHelper };