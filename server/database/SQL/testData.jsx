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
]

const createUsers = async () => {
  for (let i = 0; i < seedUsers.length; i++) {
    await createUserHelper(seedUsers[i], (result) => console.log(seedUsers[i].username, ' added to DB'));
  }
}

const updateUsers = async () => {
  for (let i = 0; i < userUpdates.length; i++) {
    await updateUserHelper(userUpdates[i], (result) => console.log(userUpdates[i].username, ' info updated'))
  }
}

const seedData = async () => {
  await createUsers();
  await updateUsers();
}

seedData();