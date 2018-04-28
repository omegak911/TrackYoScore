import { 
  addHistoryHelper, 
  addConfirmationHelper, 
  addUserConfirmationHelper, 
  doesConfirmationExistHelper, 
  fetchHistoryHelper, 
  validateConfirmationHelper }from './HistoryHelper';

const addConfirmation = (req,res) => {
  //check if user is logged in
  addConfirmationHelper(req.body, (result) => {
    //for each user, add to temp hist join table for confirmation
    // const players = Object.keys(/* players */);
    // for (let i = 0; i < players.length; i++) {
    //   addUserConfirmationHelper(/* object.userID, object.historyConfirmationID*/)
    // }
    res.status(201).send('success')
  })
  //on success, client side should update user notification just for that user
}

const validateConfirmation = (req, res) => {
  //check if user is logged in

  validateConfirmationHelper

}


const addHistory = (req, res) => {
  //this function should be used by updat Temp Hist
}

const fetchHistory = (req, res) => {

}

export { addConfirmation, fetchHistory };