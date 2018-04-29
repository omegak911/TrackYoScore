import { 
  addHistoryHelper, 
  addUserHistoryHelper,
  addConfirmationHelper, 
  addUserConfirmationHelper, 
  doesConfirmationExistHelper, 
  fetchHistoryHelper, 
  validateConfirmationHelper }
  from './HistoryHelper';

const addConfirmation = (req,res) => {
  //check if user is logged in
  addConfirmationHelper(req.body, (result) => {
    //for each user, add to temp hist join table for confirmation
    // const players = Object.keys(/* players */);
    // for (let i = 0; i < players.length; i++) {
    //   addUserConfirmationHelper(/* object.userID, object.historyConfirmationID*/)
    // }
    res.status(201).send('success')
  });
  //on success, client side should update user notification just for that user
};

const validateConfirmation = (req, res) => {
  //check if user is logged in
  validateConfirmationHelper(req.body, (result) => {  //accepts confirmationID as id + update confirmation
    //take result, check if validation is 0
    //if 0, send to History and remove join + confirmation
    //addHistory
    res.status(201).send('success');
  });
};

const addHistory = (req, res) => {
  //this function should be used by validateConfirmation

  addHistoryHelper(/* object.gameID + object.playerScore */, (result) => {
    addUserHistoryHelper(/* userID, historyID*/)
    res.status(201).send('success');
  });
};

const doesConfirmationExist = (req,res) => {
//check if user is logged in
  doesConfirmationExistHelper(/* userID */, (result) => {
    console.log('doesConfirmationExist result: ', result);
    res.status(201).send('success');
  });
};

const fetchHistory = (req, res) => {
  //check if user is logged in
  fetchHistoryHelper(/* userID */, (result) => {
    console.log('fetchHistory result: ', result);
    res.status(201).send('success');
  });
};

export { 
  addConfirmation, 
  validateConfirmation, 
  addHistory, 
  doesConfirmationExist, 
  fetchHistory 
};