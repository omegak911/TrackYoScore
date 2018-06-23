import faker from 'faker';
import axios from "axios";

import db from '../index';
import { Friends, FriendRequests, Games, History, HistoryConfirmation, Perks, Users, UserPerks, UserHistories, TempUserHistories } from './index';
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
const entries = 10000;

const createUsers = async (totalUsersCreated) => {
  let hist = {}
  let histIdNames = {}
  let numUsersCreated = 0;
  for (let i = totalUsersCreated; i < entries + totalUsersCreated; i++) {
    let User = {
      username: faker.name.firstName() + faker.random.number(),
      password: faker.random.word(),
    }

    if (hist[User.username]) {
      continue;
    } else {
      hist[User.username] = true;
      histIdNames[i] = User.username;
      numUsersCreated += 1;
      // await axios.post('http://localhost:3666/api/auth/signup/', User);
      await createUserHelper(User, () => { return });
    }
  };

  return {
    histIdNames,
    numUsersCreated
  }
};

const updateUsers = async (totalUsersCreated) => {
  for (let i = 1; i < entries; i++) {
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
  let gameHist = {};
  let currentNumGames = 0;
  for (let i = 0; i < entries; i++) {
    let title = faker.random.word() + faker.random.number();
    let image = faker.image.imageUrl();
    let game = {
      title,
      image
    }
    if (gameHist[title]) {
      continue;
    } else {
      currentNumGames += 1;
      gameHist[title] = true;
      await addGameHelper(game, (result) => { return });
    }
  };
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

const createConfirmation = async ({ numUsersCreated, histIdNames }, currentNumGames) => {
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

const createFriendRequest = async (totalUsersCreated) => {
  for (let i = 0; i < entries; i++) {
    let friendId = Math.floor(Math.random() * totalUsersCreated) + 1;
    let userId = Math.floor(Math.random() * totalUsersCreated) + 1;
    await friendRequestHelper(friendId, userId, () => { return });
  }
}
//note that createFriendRequest isn't suppose to already exist in createFriend, but we'll worry about that later
const createFriend = async (totalUsersCreated) => {
  for (let i = 0; i < entries; i++) {
    let friendId = Math.floor(Math.random() * totalUsersCreated) + 1;
    let userId = Math.floor(Math.random() * totalUsersCreated) + 1;
    await addFriendHelper({ friendId, userId }, () => { return });
  }
}

const bulkCreate = async () => {
  let totalUsersCreated = 0;
  let totalGamesCreated = 0;
  for (var i = 0; i < 1; i++) {
    let { numUsersCreated, histIdNames }  = await createUsers(totalUsersCreated);
    totalUsersCreated += numUsersCreated;

    let currentNumGames = await createGames(totalGamesCreated);
    totalGamesCreated += currentNumGames;

    await updateUsers(totalUsersCreated);
    await createConfirmation({ numUsersCreated, histIdNames }, totalGamesCreated);
    await createHistory({ numUsersCreated, histIdNames }, totalGamesCreated);
    await createFriendRequest(totalUsersCreated);
    await createFriend(totalUsersCreated);
  }
}

const seedData = async () => {
  await db.sync({ force: true })
  // await db.sync({ force: false, logging: console.log })
  .then( async () => {
    console.log('db synced')
    await bulkCreate();
    await process.exit();
  })
  .catch(() => console.log('error syncing database'));
};

seedData();


//TIME  | TOTAL_ENTRIES | USERS   FRIENDS   FRIEND_REQUEST   GAMES   CONFIRMATION    USER_CONFIRMATION   HISTORIES   USER_HISTORIES
//1610s   649247          3000                               3904    64295           256738              64353       256957
//27mins


//15.73   1181            100                                100     99              391                 100         391
//15.14                   100     196                        100     98              380                 100         397
//418.48  150000          9993    19978      9985            10000   10000           39971               9999        39962