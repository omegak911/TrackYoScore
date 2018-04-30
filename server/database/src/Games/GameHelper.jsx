import { Games } from '../../SQL/index';

const addGameHelper = ({ title, image }, callback) =>
  Games
    .create({
      title,
      image,
    })
    .then(result => callback(result))
    .catch(err => console.log(err));

const fetchGameHelper = (callback) =>
  Games
    .findAll({})
    .then(result => callback(result))
    .catch(err => console.log(err));

export { addGameHelper, fetchGameHelper };