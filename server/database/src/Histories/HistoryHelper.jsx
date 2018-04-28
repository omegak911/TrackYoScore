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

const addUserConfirmationHelper = ({ userID, historyConfirmationID }) =>
  UserHistoryConfirmations.create({
    userID,
    historyConfirmationID,
  })
  .then(result => console.log(`userID: ${userID} entry submitted to user_history_confirmation table`))
  .catch(err => console.log(err));

const addHistoryHelper = ({ gameID, playerScore }, callback) => {
  return Histories.create({
    gameID,
    playerScore,
  })
  .then(result => {
    //for each user, add to history join table
    callback(result)})
  .catch(err => console.log(err));
};

const doesConfirmationExistHelper = ({ userID }, callback) => 
  UserHistoryConfirmations.findAll({
    where: {
      userID,
    }
  })
  .then(result => callback(result))
  .catch(err => console.log(err));

const fetchHistoryHelper = ({ userID }, callback) => {
  return UserHistories.findAll({
    where: {
      userID,
    }
  })
  .then(result => callback(result))
  .then(err => console.log(err));
}

const validateConfirmationHelper = ({ id, playerScore }, callback) => {
  return HistoryConfirmation.findOne({
    where: {
      id,  //id of the game, taken from user_history_confirmations
    }
  })
  .then(result => {
    //take result, update player Score, check if validation is 0
    //if 0, send to History
    //if > 0, update temp history
    callback(result);
  })
  .catch(err => console.log(err));
}

export { 
  addHistoryHelper, 
  addConfirmationHelper, 
  addUserConfirmationHelper, 
  doesConfirmationExistHelper, 
  fetchHistoryHelper, 
  validateConfirmationHelper 
};