import faker from 'faker';
import axios from "axios";

import db from '../index';
import { Friends, FriendRequests, Games, History, HistoryConfirmation, Perks, Users, UserPerks, UserHistories, UserHistoryConfirmations } from './index';
import { updateUserHelper } from '../src/Users/UserHelper';
import { createUserHelper, validateUserHelper } from '../src/Auth/AuthHelper';
import { addGameHelper, fetchGameHelper } from '../src/Games/GameHelper';
import { addFriendHelper, friendRequestHelper } from '../src/Friends/FriendHelper';

import { 
  addHistoryHelper, 
  addUserHistoryHelper,
  addConfirmationHelper, 
  addUserConfirmationHelper, 
  doesConfirmationExistHelper, 
  fetchHistoryHelper, 
  validateConfirmationHelper
} from '../src/Histories/HistoryHelper';

//How many times do I want to try to create unique data per table?
const entries = 100000;

const createUsers = async (totalUsersCreated) => {
  let histIdNames = {}
  let numUsersCreated = 0;
  let bulkArray = [];
  for (let i = totalUsersCreated; i < entries + totalUsersCreated; i++) {
    let User = {
      username: faker.name.firstName() + faker.random.number() + faker.name.lastName() + faker.random.number(),
      password: faker.random.word(),
    }

    histIdNames[i] = User.username;
    numUsersCreated += 1;
    // await axios.post('http://localhost:3666/api/auth/signup/', User);
    bulkArray.push(User);
  };
  
  await Users.bulkCreate(bulkArray)
    .then(() => console.log('success'))
    .catch(err => {
      console.log('why?: ', Object.keys(err.parent))
    })
          
  return {
    histIdNames,
    numUsersCreated
  }
};

const updateUsers = async (totalUsersCreated) => {
  let end = entries / 4;
  for (let i = 1; i < end; i++) {
    let user_id = Math.floor(Math.random() * totalUsersCreated)  + 1;
    let level = Math.floor(Math.random() * 100);
    let currentEXP = Math.floor(Math.random() * 100) * level;
    let nextLevelEXP = currentEXP + Math.floor(Math.random() * 1000);
    let wins = Math.floor(Math.random() * 1000);
    let losses = Math.floor(Math.random() * 1000)

    let data = {
      level,
      currentEXP,
      nextLevelEXP,
      wins,
      losses,
    }
    await updateUserHelper( user_id, data, (result) => { return });
  };
};

const createGames = async () => {
  let currentNumGames = 0;
  let bulkArray = [];
  for (let i = 0; i < entries; i++) {
    let title = faker.random.word() + faker.random.number() + faker.random.word() + faker.random.number();
    let image = faker.image.imageUrl();
    let game = {
      title,
      image
    }
    currentNumGames += 1;
    bulkArray.push(game);
  };

  await Games.bulkCreate(bulkArray)
    .then(() => console.log('success'))
    .catch(err => {
      console.log('why?: ', Object.keys(err.parent))
    })
  
  return currentNumGames;
};


const randomHist = (userObject, numUsersCreated, currentNumGames) => {
  let randomId1 = Math.floor(Math.random() * numUsersCreated) + 1;
  let randomId2 = Math.floor(Math.random() * numUsersCreated) + 1;
  let randomId3 = Math.floor(Math.random() * numUsersCreated) + 1;
  let randomId4 = Math.floor(Math.random() * numUsersCreated) + 1;

  let confirmation = {
    gameId: Math.floor(Math.random() * currentNumGames), //pick one of the games
    playerScore: {}
  }

  confirmation.playerScore[randomId1 + 1] = {
    username: userObject[randomId1],
    score: 10,
  }

  confirmation.playerScore[randomId2 + 1] = {
    username: userObject[randomId2],
    score: 10,
  }

  confirmation.playerScore[randomId3 + 1] = {
    username: userObject[randomId3],
    score: 5,
  }

  confirmation.playerScore[randomId4 + 1] = {
    username: userObject[randomId4],
    score: 5,
  }

  return confirmation;
}

const createConfirmation = async ({ numUsersCreated, histIdNames }, currentNumGames, iteration) => {
  let bulkArray = [];
  for (let i = 0; i < entries; i++) {
    bulkArray.push(randomHist(histIdNames, numUsersCreated, currentNumGames));
  }

  await HistoryConfirmation.bulkCreate(bulkArray)
    .then( async () => {
      let userConfirmationBulkArray = [];
      for (let k = 0; k < bulkArray.length; k++) {
        for (let key in bulkArray[k].playerScore) {
          userConfirmationBulkArray.push({ userId: Number(key), confirmationId: 1 + entries * iteration })
        }
      }
      await UserHistoryConfirmations.bulkCreate(userConfirmationBulkArray)
    })
    .catch(err => console.log('create confirmation error'))



  for (let i = 0; i < entries; i++) {
    let confirmation = randomHist(histIdNames, numUsersCreated, currentNumGames);

    await addConfirmationHelper(confirmation, async ({dataValues}) => {
      const { playerScore } = dataValues;
      for (let key in playerScore) {
        await addUserConfirmationHelper(Number(key), dataValues.id)
      }
    });
  };
};

const createHistory = async ({ numUsersCreated, histIdNames }, currentNumGames) => {
  for (let i = 0; i < entries; i++) {
    let confirmation = randomHist(histIdNames, numUsersCreated, currentNumGames);

    await addHistoryHelper(confirmation, async ({ dataValues }) => {
      const { id, playerScore } = dataValues
      for (let key in playerScore) {
        await addUserHistoryHelper(key, id);
      }
    })
  }
}

const createFriendHelper = async (totalUsersCreated) => {
  let bulkArray = [];
  let bulkArrayReversed = [];
  for (let i = 0; i < entries; i++) {
    let friendId = Math.floor(Math.random() * totalUsersCreated) + 1;
    let userId = Math.floor(Math.random() * totalUsersCreated) + 1;
    bulkArray.push({ friendId, userId });
    bulkArrayReversed.push({ friendId: userId, userId: friendId });
  }
  return { bulkArray, bulkArrayReversed };
}

const createFriendRequest = async (totalUsersCreated) => {
  let { bulkArray } = await createFriendHelper(totalUsersCreated);

  await FriendRequests.bulkCreate(bulkArray)
    .then(() => { return })
    .catch(() => console.log('friend request error'))
}

//note that createFriendRequest isn't suppose to already exist in createFriend, but we'll worry about that later
const createFriend = async (totalUsersCreated) => {
  let { bulkArray, bulkArrayReversed } = await createFriendHelper(totalUsersCreated);

  await Friends.bulkCreate(bulkArray)
    .then( async() => {
      await Friends.bulkCreate(bulkArrayReversed)
        .then(() => { return })
        .catch(() => console.log('friend request error'))
    })
    .catch(() => console.log('friend request error'))
}

const setIterations = async () => {
  let totalUsersCreated = 0;
  let totalGamesCreated = 0;
  for (var i = 0; i < 5; i++) {
    let { numUsersCreated, histIdNames }  = await createUsers(totalUsersCreated);
    totalUsersCreated += numUsersCreated;
    let currentNumGames = await createGames(totalGamesCreated);
    totalGamesCreated += currentNumGames;
    // await updateUsers(totalUsersCreated);
    // await createConfirmation({ numUsersCreated, histIdNames }, totalGamesCreated, i + 1);
    // await createHistory({ numUsersCreated, histIdNames }, totalGamesCreated);
  }
  // for (let k = 0; k < 1; k++) {
  //   await createFriendRequest(totalUsersCreated);
  //   await createFriend(totalUsersCreated);
  // }
  console.log(`created ${totalUsersCreated} new Users`)
  console.log(`created ${totalGamesCreated} new Games`)
  // console.log(`created ${entries/4} userUpdates`)
  // console.log(`created ${entries * 10} friend requests`)
  // console.log(`created ${entries * 10 * 2} friends`)
}

const seedData = async () => {
  await db.sync({ force: true })
  // await db.sync({ force: false, logging: console.log })
  .then( async () => {
    console.log('db synced')
    await setIterations();
    await process.exit();
  })
  .catch(() => console.log('error syncing database'));
};

seedData();

//TIME    |   PER_BULK   | ITERATIONS |   NOTES
//534s        500000         2             looks like it's a lot slower than 100k, but that was before I removed histogram.
//392s        1000000        10            with histogram
//394s        1000000        10            with histogram
//407s        1000000        10            w/o histogram
//500s        2000000        5
//530s        2200000        10
//974s        3300000        15/5
//3052        6000000        20/10
