import { createUserHelper, updateUserHelper, validateUserHelper } from '../src/Users/UserHelper';
import { addGameHelper, fetchGameHelper } from '../src/Games/GameHelper';

import { 
  addHistoryHelper, 
  addUserHistoryHelper,
  addConfirmationHelper, 
  addUserConfirmationHelper, 
  doesConfirmationExistHelper, 
  fetchHistoryHelper, 
  validateConfirmationHelper
} from '../src/Histories/HistoryHelper';

const seedUsers = [
  { 
    username: 'charmander',
    password: 'charmander',
  },
  { 
    username: 'pikachu',
    password: 'pikachu',
  },
  { 
    username: 'squirtle',
    password: 'squirtle',
  },
  { 
    username: 'bulbasaur',
    password: 'bulbasaur',
  },
  { 
    username: 'charmeleon',
    password: 'charmeleon',
  },
  { 
    username: 'charizard',
    password: 'charizard',
  },
];

const userUpdates = [
  {
    username: 'pikachu',
    data: {
      level: 6,
      currentEXP: 4000,
      nextLevelEXP: 10000,
      wins: 80,
      losses: 0,
    }
  },
  {
    username: 'squirtle',
    data: {
      level: 3,
      currentEXP: 2000,
      nextLevelEXP: 2500,
      wins: 40,
      losses: 10,
    }
  },
  {
    username: 'bulbasaur',
    data: {
      level: 4,
      currentEXP: 2500,
      nextLevelEXP: 3000,
      wins: 50,
      losses: 17,
    }
  },
  {
    username: 'charizard',
    data: {
      level: 10,
      currentEXP: 20000,
      nextLevelEXP: 300000,
      wins: 100,
      losses: 2,
    }
  },
];

const seedGames = [
  {
    title: 'Super Smash Bros.',
    image: 'https://upload.wikimedia.org/wikipedia/en/4/42/Supersmashbox.jpg',
  },
  {
    title: 'Chess',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/ChessSet.jpg',
  },
  {
    title: 'Beer Pong',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Beerpong_shots.png',
  },
  {
    title: 'Hearthstone',
    image: 'https://upload.wikimedia.org/wikipedia/en/5/51/Hearthstone_screenshot.png',
  },
  {
    title: 'Hearthstone',
    image: 'https://upload.wikimedia.org/wikipedia/en/5/51/Hearthstone_screenshot.png',
  },
  {
    title: 'Settlers of Catan',
    image: 'https://upload.wikimedia.org/wikipedia/en/a/a3/Catan-2015-boxart.jpg',
  },
];

const seedConfirmationHistories = [
  {
    gameID: 2,
    playerScore: [
      {
        userID: 2,
        score: 10,
      },
      {
        userID: 3,
        score: 10,
      },
      {
        userID: 4,
        score: 5,
      },
      {
        userID: 6,
        score: 5,
      },
    ]
  },
  {
    gameID: 2,
    playerScore: [
      {
        userID: 2,
        score: 5,
      },
      {
        userID: 3,
        score: 5,
      },
      {
        userID: 4,
        score: 10,
      },
      {
        userID: 6,
        score: 10,
      },
    ]
  },
  {
    gameID: 2,
    playerScore: [
      {
        userID: 2,
        score: 10,
      },
      {
        userID: 3,
        score: 5,
      },
      {
        userID: 4,
        score: 10,
      },
      {
        userID: 6,
        score: 5,
      },
    ]
  },
];

const seedHistories = [

];


const createUsers = async () => {
  for (let i = 0; i < seedUsers.length; i++) {
    await createUserHelper(seedUsers[i], (result) => console.log(seedUsers[i].username, ' added to DB'));
  };
};

const updateUsers = async () => {
  for (let i = 0; i < userUpdates.length; i++) {
    await updateUserHelper(userUpdates[i], (result) => console.log(userUpdates[i].username, ' info updated'))
  };
};

const createGames = async () => {
  for (let i = 0; i < seedGames.length; i++) {
    await addGameHelper(seedGames[i], (result) => console.log(`Added ${seedGames[i].title} to DB`));
  };
} 

const createConfirmation = async () => {
  for (let i = 0; i < seedConfirmationHistories.length; i++) {
    await addConfirmationHelper(seedConfirmationHistories[i], async (result) => {
      let scores = result.dataValues.playerScore;
      let confirmationID = result.dataValues.id;
      console.log('*** scores before: ', scores)
      for (let k = 0; k < scores.length; k++) {
        scores[k].historyConfirmationId = confirmationID;
        scores[k].userId = scores[k].userID;
        await addUserConfirmationHelper(scores[k]);
      }
      console.log('*** scores after: ', scores)
    });

  }
}

const seedData = async () => {
  await createUsers();
  await updateUsers();
  await createGames();
  await createConfirmation();
}

seedData();