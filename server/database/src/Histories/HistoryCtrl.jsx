import { 
  addHistoryHelper, 
  addUserHistoryHelper,
  addConfirmationHelper, 
  removeUserConfirmationHelper,
  addUserConfirmationHelper, 
  fetchConfirmationHelper, 
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
        if (Number(key) !== id) {
          await addUserConfirmationHelper(Number(key), dataValues.id)
        }
      }
      res.status(201).send('Success')
    })
  }
};

const validateConfirmation = (req, res) => {
  const { id } = req.session.passport.user;
  if (id) {
    validateConfirmationHelper(req.body, async (result) => {
      await removeUserConfirmationHelper(id, result[0].id);
  
      if (result[0].validation === 0) {
        await addHistory(result[0]);
        await removeConfirmationHelper(result[0].id);
      }
      
      res.status(201).send('success');
    });
  }
};

const addHistory = (data) => {  /* input data from validateConfirmation */
  const { id } = req.session.passport.user;
  if (id) {
    addHistoryHelper(data, async ({ dataValues }) => { /* object.gameID + object.playerScore */
        const { id, playerScore } = dataValues;
        const historyId = id;

        for (let key in playerScore) {
          await addUserHistoryHelper(key, id);

          //****update user stats****//
          let data = {};
          let { score } = playerScore[key];

          if (score === 10) {
            data.currentEXP = 10,
            data.wins = 1
          } else {
            data.currentEXP = 5,
            data.losses = 1
          }

          await updateUserHelper(key, data, async (result) => {
            let { id, currentEXP, level, nextLevelEXP } = result;
            //check currentEXP against nextLevelEXP and if bigger
            if (currentEXP >= nextLevelEXP) {
              nextLevelEXP = await levelHelper(level, nextLevelEXP);
              await updateUserHelper(id, { level: 1, nextLevelEXP }, (result) => console.log('level up'))
            };
          })
        }
    });
  }
};

const fetchConfirmation = (req,res) => {
  const { id } = req.session.passport.user;
  if (id) {
    fetchConfirmationHelper(id, (resultArray) => {
      res.status(201).send(resultArray);
    });
  }
};

const fetchHistory = (req, res) => {
  const { id } = req.session.passport.user;
  if (id) {
    fetchHistoryHelper(id, (result) => {
      console.log('**** result: ', result)
      res.status(201).send(result);
    });
  }
};

export { 
  addConfirmation, 
  validateConfirmation, 
  fetchConfirmation, 
  fetchHistory 
};