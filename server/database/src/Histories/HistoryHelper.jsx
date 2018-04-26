import { Histories, HistoryConfirmation } from '../../SQL/index';

const addTempHistoryHelper = ({ gameID, playerScore }, callback) => {
  HistoryConfirmation.create({
    gameID,
    playerScore,
  })
  .then(result => callback(result))
  .catch(err => callback(err));

  //for each user, add to join table
  //notification needed for user to know there's a pending join table that needs validation
};

const addHistoryHelper = ({ gameID, playerScore }, callback) => {
  Histories.create({
    gameID,
    playerScore,
  })
  .then(result => callback(result))
  .catch(err => callback(err));
};

const fetchHistoryHelper = ({  }) => {

}

export { addHistoryHelper, addTempHistoryHelper };