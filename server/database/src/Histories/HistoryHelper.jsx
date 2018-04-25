import { Histories, HistoryConfirmation } from '../../SQL/index';

const addTempHistoryHelper = ({ gameID, playerScore }, callback) => {
  HistoryConfirmation.create({
    gameID,
    playerScore,
  })
  .then(result => callback(result))
  .catch(err => callback(err));
};

const addHistoryHelper = ({ gameID, playerScore }, callback) => {
  Histories.create({
    gameID,
    playerScore,
  })
  .then(result => callback(result))
  .catch(err => callback(err));
};

export { addHistoryHelper, addTempHistoryHelper };