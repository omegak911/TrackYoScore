import { Perks, UserPerks } from '../../SQL/index';

const addUserPerkHelper = ({ userID, perkID }, callback) =>
  UserPerks.create({
    userID,
    perkID,
  })
  .then(result => callback(result))
  .catch(err => console.log(err));

const addPerkHelper = ({ type }, callback) =>
  Perks.create({
    type,
  })
  .then(result => callback(result))
  .catch(err => console.log(err));

export { addUserPerkHelper, addPerkHelper };