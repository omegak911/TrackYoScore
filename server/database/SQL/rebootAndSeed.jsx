import db from '../index';
import { Friends, FriendRequests, Games, History, HistoryConfirmation, Perks, Users, UserPerks, UserHistories, TempUserHistories } from './index';
import { updateUserHelper } from '../src/Users/UserHelper';
import { createUserHelper, validateUserHelper } from '../src/Auth/AuthHelper';
import { addGameHelper, fetchGameHelper } from '../src/Games/GameHelper';
import { addFriendHelper, friendRequestHelper } from '../src/Friends/FriendHelper';
import axios from "axios";

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
  {
    username: 'poop',
    password: 'poop',
  }
];

const userUpdates = [
  {
    id: 2,
    data: {
      level: 6,
      currentEXP: 790,
      nextLevelEXP: 700,
      wins: 10,
      losses: 0,
    }
  },
  {
    id: 3,
    data: {
      level: 3,
      currentEXP: 400,
      nextLevelEXP: 400,
      wins: 11,
      losses: 1,
    }
  },
  {
    id: 4,
    data: {
      level: 4,
      currentEXP: 530,
      nextLevelEXP: 500,
      wins: 5,
      losses: 7,
    }
  },
  {
    id: 6,
    data: {
      level: 10,
      currentEXP: 1100,
      nextLevelEXP: 1200,
      wins: 30,
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
    title: 'Settlers of Catan',
    image: 'https://upload.wikimedia.org/wikipedia/en/a/a3/Catan-2015-boxart.jpg',
  },
];

const seedConfirmationHistories = [
  {
    gameId: 2,
    playerScore: {
      2: {
        username: 'pikachu',
        score: 10,
      },
      3: {
        username: 'squirtle',
        score: 10,
      },
      4: {
        username: 'bulbasaur',
        score: 5,
      },
      6: {
        username: 'charizard',
        score: 5,
      },
    }
  },
  {
    gameId: 2,
    playerScore: {
      2: {
        username: 'pikachu',
        score: 5,
      },
      3: {
        username: 'squirtle',
        score: 5,
      },
      4: {
        username: 'bulbasaur',
        score: 10,
      },
      6: {
        username: 'charizard',
        score: 10,
      },
    }
  },
  {
    gameId: 2,
    playerScore: {
      2: {
        username: 'pikachu',
        score: 10,
      },
      3: {
        username: 'squirtle',
        score: 5,
      },
      4: {
        username: 'bulbasaur',
        score: 10,
      },
      6: {
        username: 'charizard',
        score: 5,
      },
    }
  },
];

const seedHistories = [
  {
    gameId: 2,
    playerScore: {
      2: {
        username: 'pikachu',
        score: 10,
      },
      3: {
        username: 'squirtle',
        score: 5,
      },
      4: {
        username: 'bulbasaur',
        score: 10,
      },
      6: {
        username: 'charizard',
        score: 5,
      },
    }
  },
  {
    gameId: 2,
    playerScore: {
      2: {
        username: 'pikachu',
        score: 10,
      },
      3: {
        username: 'squirtle',
        score: 5,
      },
      4: {
        username: 'bulbasaur',
        score: 10,
      },
      6: {
        username: 'charizard',
        score: 5,
      },
    }
  },
];

const seedFriendRequests = [
  {
    friendId: 1,
    userId: 2,
  },
  {
    friendId: 3,
    userId: 2,
  },
  {
    friendId: 4,
    userId: 1,
  },
  {
    friendId: 5,
    userId: 6,
  },
  {
    friendId: 6,
    userId: 3,
  }
];

const seedFriends = [
  {
    userId: 2,
    friendId: 4,
  },
  {
    userId: 2,
    friendId: 5,
  },
  {
    userId: 6,
    friendId: 2,
  },
  {
    userId: 1,
    friendId: 3,
  },
]


const createUsers = async () => {
  for (let i = 0; i < seedUsers.length; i++) {
    await axios.post('http://localhost:3666/api/auth/signup/', seedUsers[i])
    // createUserHelper(seedUsers[i], (result) => console.log(seedUsers[i].username, ' added to DB'));
  };
};

const updateUsers = async () => {
  for (let i = 0; i < userUpdates.length; i++) {
    await updateUserHelper( userUpdates[i].id, userUpdates[i].data, (result) => console.log(result, ' info updated'))
  };
};

const createGames = async () => {
  for (let i = 0; i < seedGames.length; i++) {
    await addGameHelper(seedGames[i], (result) => console.log(`Added ${seedGames[i].title} to DB`));
  };
};

const createConfirmation = async () => {
  for (let i = 0; i < seedConfirmationHistories.length; i++) {
    await addConfirmationHelper(seedConfirmationHistories[i], async ({dataValues}) => {
      const { playerScore } = dataValues;
      for (let key in playerScore) {
        await addUserConfirmationHelper(Number(key), dataValues.id)
      }
    });
  };
};

const createHistory = async () => {
  for (let i = 0; i < seedHistories.length; i++) {
    await addHistoryHelper(seedHistories[i], async ({ dataValues }) => {
      const { id, playerScore } = dataValues
      for (let key in playerScore) {
        await addUserHistoryHelper(key, id);
      }
    })
  }
}

const createFriendRequest = async () => {
  for (let i = 0; i < seedFriendRequests.length; i++) {
    await friendRequestHelper(seedFriendRequests[i].friendId, seedFriendRequests[i].userId, () => console.log(seedFriendRequests[i], ' added createFriendRequest'))
  }
}

const createFriend = async () => {
  for (let i = 0; i < seedFriends.length; i++) {
    await addFriendHelper(seedFriends[i], () => console.log(seedFriends[i], ' added to Friends'));
  }
}

const seedData = async () => {
  await db.sync({ force: true, logging: console.log })
  .then( async () => console.log('db synced'))
  .catch(() => console.log('error syncing database'));

  await createUsers();
  await updateUsers();
  await createGames();
  await createConfirmation();
  await createHistory();
  await createFriendRequest();
  await createFriend();
  await process.exit();
};

seedData();