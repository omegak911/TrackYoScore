import { 
  addHistoryHelper, 
  addUserHistoryHelper,
  addConfirmationHelper, 
  removeUserConfirmationHelper,
  addUserConfirmationHelper, 
  doesConfirmationExistHelper, 
  removeConfirmationHelper,
  fetchHistoryHelper, 
  validateConfirmationHelper }
  from './HistoryHelper';

import { updateUserHelper } from '../Users/UserHelper';
import levelHelper from '../Users/LevelHelper';

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
  validateConfirmationHelper(req.body, async (result) => {  //accepts confirmationId and validation - 1
    const { userId } = req.body;
    const confirmationId = req.body.id

    //remove user_confirmation from join table
    await removeUserConfirmationHelper({ userId, confirmationId });

    //take result, check if validation is 0
    //if 0, send to History and remove join + confirmation
    result = result[1][0];

    //if validation === 0
      //add to history
      //remove from confirmation
    const { playerScore } = result;
    if (result.validation === 0) {
      await addHistory(result);
      await removeConfirmationHelper(result);
    }
    
    res.status(201).send('success');
  });
};

const addHistory = (data) => {  /* input data from validateConfirmation */
  //add validated confirmation to history
  addHistoryHelper(data, async ({ dataValues }) => { /* object.gameID + object.playerScore */
      const { id, playerScore } = dataValues;
      const historyId = id;
      //for each user in playerScore
      for (let i = 0; i < playerScore.length; i++) {
        let { userId } = playerScore[i];
        //add to user_history
        await addUserHistoryHelper({ userId, historyId });
        //e.g. playerScore = [{ userId, score }, { userId, score }, { userId, score }, { userId, score }]
        //update user stats////////


        //if score is 10 - add to win
        //if score is 5 - add to losses

        //1 - find user, get result, update result, update db
        //2 - see if there's a way we can do this with one query

        // const updateUserHelper = ({ username, data }, callback) =>
        //   Users.update(
        //     data,
        //     {
        //       where: { username },
        //       returning: true,
        //       raw: true,
        //       attributes: { exclude: [ 'password', 'createdAt', 'updatedAt'] }
        //     }
        //   )
        //   .then(result => callback(result))
        //   .catch(err => console.log(err))


        //   let { username } = req.body;
        //   let { currentEXP, nextLevelEXP, wins, losses, level } = req.body.data;
        //   console.log('reached')
        //   console.log(username);
        //   console.log(req.body.data)
        //   if (currentEXP >= nextLevelEXP) {
        //     nextLevelEXP = await levelHelper(nextLevelEXP);
        //     level += 1;
        //     console.log('reached if')
        //   };

        //   const userData = {
        //     username,
        //     currentEXP,
        //     nextLevelEXP,
        //     wins,
        //     losses
        //   };

        //   await updateUserHelper(userData, (result) => {
        //     res.status(201).send(result);
        //   });
        // };

      }
  });
};

const doesConfirmationExist = (req,res) => {
//check if user is logged in
  doesConfirmationExistHelper(req.body, (result) => { /* userID */
    console.log('doesConfirmationExist result: ', result);
    res.status(201).send('success');
  });
};

const fetchHistory = (req, res) => {
  //check if user is logged in
  fetchHistoryHelper(req.body, (result) => { /* userID */
    console.log('fetchHistory result: ', result);
    res.status(201).send('success');
  });
};

export { 
  addConfirmation, 
  validateConfirmation, 
  doesConfirmationExist, 
  fetchHistory 
};