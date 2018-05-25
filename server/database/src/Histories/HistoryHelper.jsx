import { Users, Histories, HistoryConfirmation, UserHistories, UserHistoryConfirmations } from '../../SQL/index';

const addConfirmationHelper = ({ gameId, playerScore, validation = Object.keys(playerScore).length }, callback) =>
  HistoryConfirmation.create({
    gameId,
    playerScore,
    validation,
  })
  .then(result => {
    callback(result)})
  .catch(err => console.log(err));

const addUserConfirmationHelper = (userId, confirmationId) =>
  UserHistoryConfirmations.create({
    userId,
    confirmationId,
  })
  .then(result => console.log(`userID: ${userId} entry submitted to user_confirmation table`))
  .catch(err => console.log(err));

const removeUserConfirmationHelper = ({ userId, confirmationId }) =>
  UserHistoryConfirmations.destroy({
    where: {
      userId,
      confirmationId,
    }
  })
  .then(result => console.log(result))
  .catch(err => console.log(err));

const doesConfirmationExistHelper = (userID, callback) => 
  UserHistoryConfirmations.findAll({
    where: {
      userID,
    }
  })
  .then(result => callback(result))
  .catch(err => console.log(err));

const removeConfirmationHelper = ({ id }) => 
  HistoryConfirmation.destroy({
    where: { id }
  })
  .then(result => console.log(result))
  .catch(err => console.log(err));

const validateConfirmationHelper = ({ id, validation }, callback) =>
  HistoryConfirmation.update(
    { validation },
    { where: { id },  //id of confirmation, taken from user_history_confirmations
    returning: true,
    raw: true
    })
    .then(result => {
      callback(result);
    })
    .catch(err => console.log(err));

const addHistoryHelper = ({ gameId, playerScore }, callback) =>
  Histories.create({
    gameId,
    playerScore,
  })
  .then(result => {
    //for each user, add to history join table
    callback(result)})
  .catch(err => console.log(err));

const addUserHistoryHelper = (userId, historyId) =>
  UserHistories.create({
    userId,
    historyId,
  })
  .then(() => console.log('success'))
  .catch(err => console.log(err));

const fetchHistoryHelper = (id, callback) =>
  Users.findOne({
    where: { id },
    attributes: ['username'],
    plain: true,
    include: [{
      model: Histories,
      as: 'challengeHistory',
      attributes: ['playerScore'],
    }]
  })
  .then(({ dataValues }) => callback(dataValues.challengeHistory))
  .catch(err => console.log(err));

export { 
  addHistoryHelper, 
  addUserHistoryHelper,
  addConfirmationHelper, 
  removeUserConfirmationHelper,
  addUserConfirmationHelper, 
  doesConfirmationExistHelper, 
  removeConfirmationHelper,
  fetchHistoryHelper, 
  validateConfirmationHelper
};