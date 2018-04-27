import { Histories, HistoryConfirmation, UserHistories } from '../../SQL/index';

const addTempHistoryHelper = ({ gameID, playerScore }, callback) => {
  return HistoryConfirmation.create({
    gameID,
    playerScore,
  })
  .then(result => { 
    //for each user, add to temp hist join table for confirmation
    //notification needed for user to know there's a pending join table that needs validation
    callback(result)})
  .catch(err => console.log(err));


};

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

export { addHistoryHelper, addTempHistoryHelper };