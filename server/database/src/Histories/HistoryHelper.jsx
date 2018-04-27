import { Histories, HistoryConfirmation, UserHistories, UserHistoryConfirmations } from '../../SQL/index';

const addConfirmationHelper = ({ gameID, playerScore, validation = Object.keys(playerScore).length }, callback) => {
  return HistoryConfirmation.create({
    gameID,
    playerScore,
    validation,
  })
  .then(result => { 
    //for each user, add to temp hist join table for confirmation
    //notification needed for user to know there's a pending join table that needs validation
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

const validateConfirmationHelper = ({ id, playerScore }, callback) => {
  return HistoryConfirmation.findOne({
    where: {
      id,
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

const fetchHistoryHelper = ({ userID }, callback) => {
  return UserHistories.findAll({
    where: {
      userID,
    }
  })
  .then(result => callback(result))
  .then(err => console.log(err));
}

export { addHistoryHelper, addConfirmationHelper, doesConfirmationExistHelper, fetchHistoryHelper, validateConfirmationHelper };