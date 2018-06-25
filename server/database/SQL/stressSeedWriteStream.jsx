import fs from 'fs';
import faker from 'faker';
import path from 'path';
import { Friends, FriendRequests, Games, Histories, HistoryConfirmation, Perks, Users, UserPerks, UserHistories, UserHistoryConfirmations } from './index';

import db from '../index';
// const file = fs.createWriteStream('./server/database/SQL/testData.csv');
const seedUsers = fs.createWriteStream('./server/database/SQL/seedData/users.csv');
const seedConfirmations = fs.createWriteStream('./server/database/SQL/seedData/confirmations.csv');
const seedUserConfirmations = fs.createWriteStream('./server/database/SQL/seedData/userConfirmations.csv');
const seedHistories = fs.createWriteStream('./server/database/SQL/seedData/histories.csv');

const seedGames = fs.createWriteStream('./server/database/SQL/seedData/games.csv');
const seedFriendRequests = fs.createWriteStream('./server/database/SQL/seedData/friendRequests.csv');
const seedFriends = fs.createWriteStream('./server/database/SQL/seedData/friends.csv');
//seed update users?

const iterations = 1;
const entries = 50000;
const totalNumGames = 1000;

//confirmations, user_confirmations, histories, and user_histories rely on user data.  So it has to be made together
const createUsersConfirmationsAndHistories = async () => {
  // let histories = '';
  let totalNumUsers = 0;
  for (let k = 0; k < iterations; k++) {
    let histIdNames = {}
    let users = '';
    let confirmations = '';
    let userConfirmations = '';
    //create users
    for (let i = 1; i < entries + 1; i++) {
      let username = faker.name.firstName() + faker.random.number() + faker.name.lastName() + faker.random.number();
      let password = faker.random.word();
  
      histIdNames[i] = username;
      users += `${username}\t${password}\n`;
    };

    //create confirmations
    totalNumUsers += entries;
    let totalConfirmations = 0;
    for (let m = 0; m < entries/10; m++) {
      let randomId1 = Math.floor(Math.random() * totalNumUsers) + 1;
      let randomId2 = Math.floor(Math.random() * totalNumUsers) + 1;
      let randomId3 = Math.floor(Math.random() * totalNumUsers) + 1;
      let randomId4 = Math.floor(Math.random() * totalNumUsers) + 1;
      let randomGame = Math.floor(Math.random() * totalNumGames) + 1;
      totalConfirmations += 1;
      confirmations += `${randomGame}\t"{""${randomId1}"": {""username"":""${histIdNames[randomId1]}"",""score"":10},""${randomId2}"":{""username"":""${histIdNames[randomId2]}"",""score"":5},""${randomId3}"":{""username"":""${histIdNames[randomId3]}"",""score"":10},""${randomId4}"":{""username"":""${histIdNames[randomId4]}"",""score"":5}}"\t3\n`
      userConfirmations += `${totalConfirmations}\t${randomId1}\n${totalConfirmations}\t${randomId2}\n${totalConfirmations}\t${randomId3}\n${totalConfirmations}\t${randomId4}\n`
    }

    //create user_confirmations
    //create histories
    //create user_histories

    seedUsers.write(users)
    seedConfirmations.write(confirmations);
    seedUserConfirmations.write(userConfirmations);

  }
  //tell computer that we are done adding
  seedUsers.end()
  seedConfirmations.end();
  seedUserConfirmations.end();

  return true
};

const createGames = async () => {
  let games = '';
  for (let i = 0; i < totalNumGames; i++) {
    let title = faker.random.word() + faker.random.number() + faker.random.word() + faker.random.number();
    let image = faker.image.imageUrl();
    games += `${title}\t${image}\n`;
  }
  await seedGames.write(games);
  await seedGames.end();
}

const seedData = async () => {
  await db.sync()
    .then( async () => {
      console.log('db synced')
      //clean out all tables (order is important)
      await UserHistories.truncate({ restartIdentity: true, cascade: true });
      await UserHistoryConfirmations.truncate({ restartIdentity: true, cascade: true });
      await HistoryConfirmation.truncate({ restartIdentity: true, cascade: true });
      await Histories.truncate({ restartIdentity: true, cascade: true });
      await Friends.truncate({ restartIdentity: true, cascade: true });
      await FriendRequests.truncate({ restartIdentity: true, cascade: true });
      await Games.truncate({ restartIdentity: true, cascade: true });
      await Users.truncate({ restartIdentity: true, cascade: true });
    })
    .then( async () => {
      //fill up tables (order is important)
      await createGames();
      await db.query(`COPY games (title, image) FROM '${path.join(__dirname, '/seedData/games.csv')}' DELIMITER '\t' CSV`);
      await createUsersConfirmationsAndHistories();
      await db.query(`COPY users (username, password) FROM '${path.join(__dirname, '/seedData/users.csv')}' DELIMITER '\t' CSV`);
      await db.query(`COPY confirmations ("gameId", "playerScore", validation) FROM '${path.join(__dirname, '/seedData/confirmations.csv')}' DELIMITER '\t' CSV`);
      await db.query(`COPY user_confirmations ("confirmationId", "userId") FROM '${path.join(__dirname, './seedData/userConfirmations.csv')}' DELIMITER '\t' CSV`);
      await process.exit();
    })
    .catch((err) => console.log('error syncing database: ', err));
};

seedData();