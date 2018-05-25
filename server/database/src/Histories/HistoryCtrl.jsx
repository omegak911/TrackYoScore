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
  const { id } = req.session.passport.user;
  if (id) {
    addConfirmationHelper(req.body, async ({ dataValues }) => {
      const { playerScore } = dataValues;
      for (let key in playerScore) {
        await addUserConfirmationHelper(Number(key), dataValues.id)
      }
      res.status(201).send('Success')
    })
  }
};

const validateConfirmation = (req, res) => {
  // const { id } = req.session.passport.user;
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
        let { userId, score } = playerScore[i];
      
        //add to user_history

        await addUserHistoryHelper({ userId, historyId });
        //e.g. playerScore = [{ userId, score }, { userId, score }, { userId, score }, { userId, score }]
        //****update user stats****//

        //if score is 10 - add to win
        //if score is 5 - add to losses
        let data = {}
        if (score === 10) {
          data.currentEXP = 10,
          data.wins = 1
        } else {
          data.currentEXP = 5,
          data.losses = 1
        }

        await updateUserHelper(userId, data, async (result) => {
          let { id, currentEXP, level, nextLevelEXP } = result;
          //check currentEXP against nextLevelEXP and if bigger
          if (currentEXP >= nextLevelEXP) {
            nextLevelEXP = await levelHelper(level, nextLevelEXP);
            await updateUserHelper(id, { level: 1, nextLevelEXP }, (result) => {
          })
          };
        })
      }
  });
};

const doesConfirmationExist = (req,res) => {
  const { id } = req.session.passport.user;
  doesConfirmationExistHelper(id, (result) => {
    console.log('doesConfirmationExist result: ', result);
    res.status(201).send('success');
  });
};

const fetchHistory = (req, res) => {
  const { id } = req.session.passport.user;
  fetchHistoryHelper(id, (result) => {
    res.status(201).send(result);
  });
};

export { 
  addConfirmation, 
  validateConfirmation, 
  doesConfirmationExist, 
  fetchHistory 
};