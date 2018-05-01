import { Histories, HistoryConfirmation, UserHistories, UserHistoryConfirmations } from '../../SQL/index';

const addConfirmationHelper = ({ gameID, playerScore, validation = Object.keys(playerScore).length }, callback) =>
  HistoryConfirmation.create({
    gameID,
    playerScore,
    validation,
  })
  .then(result => { 
    callback(result)})
  .catch(err => console.log(err));

const addUserConfirmationHelper = ({ userId, confirmationId }) =>
  UserHistoryConfirmations.create({
    userId,
    confirmationId,
  })
  .then(result => console.log(`userID: ${userId} entry submitted to user_history_confirmation table`))
  .catch(err => console.log(err));

const doesConfirmationExistHelper = ({ userID }, callback) => 
  UserHistoryConfirmations.findAll({
    where: {
      userID,
    }
  })
  .then(result => callback(result))
  .catch(err => console.log(err));

const validateConfirmationHelper = ({ id, playerScore }, callback) =>
  HistoryConfirmation.update(
    { playerScore },
    { where: {
      id,  //id of the game, taken from user_history_confirmations
    },
    returning: true,
    plain: true,
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

const addUserHistoryHelper = ({ userId, historyId }) =>
  UserHistories.create({
    userId,
    historyId,
  })
  .then(() => console.log('success'))
  .catch(err => console.log(err));

const fetchHistoryHelper = ({ userId }, callback) =>
  UserHistories.findAll({
    where: {
      userId,
    }
  })
  .then(result => callback(result))
  .then(err => console.log(err));

export { 
  addHistoryHelper, 
  addUserHistoryHelper,
  addConfirmationHelper, 
  addUserConfirmationHelper, 
  doesConfirmationExistHelper, 
  fetchHistoryHelper, 
  validateConfirmationHelper
};