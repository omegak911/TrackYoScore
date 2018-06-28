import fs from 'fs';
import faker from 'faker';
import path from 'path';

const seedUsers = fs.createWriteStream('./server/database/SQL/seedData/users.csv');
const seedConfirmations = fs.createWriteStream('./server/database/SQL/seedData/confirmations.csv');
const seedUserConfirmations = fs.createWriteStream('./server/database/SQL/seedData/userConfirmations.csv');
const seedHistories = fs.createWriteStream('./server/database/SQL/seedData/histories.csv');
const seedUserHistories = fs.createWriteStream('./server/database/SQL/seedData/userHistories.csv');
const seedGames = fs.createWriteStream('./server/database/SQL/seedData/games.csv');
const seedFriendRequests = fs.createWriteStream('./server/database/SQL/seedData/friendRequests.csv');
const seedFriends = fs.createWriteStream('./server/database/SQL/seedData/friends.csv');
//seed update users?

const iterations = 20;
const entries = 200000;  //equals users per iteration, confirmation + histories are entries/20 per iteration

const totalNumGames = 2000000;
const totalFriendRequests = 800000;
const totalFriends = 800000;

//confirmations, user_confirmations, histories, and user_histories rely on user data.  So it has to be made together
const createUsersConfirmationsAndHistories = async () => {
  let totalNumUsers = 0;
  let totalConfirmations = 0; //to keep track of confirmationId for user_confirmations
  let totalHistories = 0;
  for (let k = 0; k < iterations; k++) {
    let histIdNames = {}
    let users = '';

    //create users
    for (let i = 1; i < entries + 1; i++) {
      let username = faker.name.firstName() + faker.random.number() + faker.name.lastName() + faker.random.number();
      let password = faker.random.word();
  
      histIdNames[totalNumUsers + i] = username;
      users += `${username}\t${password}\n`;
    };

    //create confirmations
    let confirmations = '';
    let userConfirmations = '';
    for (let m = 0; m < entries/50; m++) {
      let randomId1 = Math.floor(totalNumUsers + Math.random() * entries) + 1;
      let randomId2 = Math.floor(totalNumUsers + Math.random() * entries) + 1;
      let randomId3 = Math.floor(totalNumUsers + Math.random() * entries) + 1;
      let randomId4 = Math.floor(totalNumUsers + Math.random() * entries) + 1;
      let randomGame = Math.floor(Math.random() * totalNumGames) + 1;
      totalConfirmations += 1;
      confirmations += `${randomGame}\t"{""${randomId1}"": {""username"":""${histIdNames[randomId1]}"",""score"":10},""${randomId2}"":{""username"":""${histIdNames[randomId2]}"",""score"":5},""${randomId3}"":{""username"":""${histIdNames[randomId3]}"",""score"":10},""${randomId4}"":{""username"":""${histIdNames[randomId4]}"",""score"":5}}"\t3\n`
      userConfirmations += `${totalConfirmations}\t${randomId1}\n${totalConfirmations}\t${randomId2}\n${totalConfirmations}\t${randomId3}\n${totalConfirmations}\t${randomId4}\n`;
    }

    //create histories
    let histories = '';
    let userHistories = '';
    for (let m = 0; m < entries/10; m++) {
      let randomId1 = Math.floor(totalNumUsers + Math.random() * entries) + 1;
      let randomId2 = Math.floor(totalNumUsers + Math.random() * entries) + 1;
      let randomId3 = Math.floor(totalNumUsers + Math.random() * entries) + 1;
      let randomId4 = Math.floor(totalNumUsers + Math.random() * entries) + 1;
      let randomGame = Math.floor(Math.random() * totalNumGames) + 1;
      totalHistories += 1;
      histories += `${randomGame}\t"{""${randomId1}"": {""username"":""${histIdNames[randomId1]}"",""score"":10},""${randomId2}"":{""username"":""${histIdNames[randomId2]}"",""score"":5},""${randomId3}"":{""username"":""${histIdNames[randomId3]}"",""score"":10},""${randomId4}"":{""username"":""${histIdNames[randomId4]}"",""score"":5}}"\n`
      userHistories += `${totalHistories}\t${randomId1}\n${totalHistories}\t${randomId2}\n${totalHistories}\t${randomId3}\n${totalHistories}\t${randomId4}\n`;
    }

    totalNumUsers += entries;   //we only create userIds within how many users have been created

    await seedUsers.write(users);
    await seedConfirmations.write(confirmations);
    await seedUserConfirmations.write(userConfirmations);
    await seedHistories.write(histories);
    await seedUserHistories.write(userHistories);
  }
  //tell computer that we are done adding
  await seedUsers.end();
  await seedConfirmations.end();
  await seedUserConfirmations.end();

  return true;
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

  return true;
}

const createFriendRequests = async () => {
  let friendRequests = '';
  for (let i = 0; i < totalFriendRequests; i++) {
    let randomId1 = Math.floor(Math.random() * entries * iterations) + 1;
    let randomId2 = Math.floor(Math.random() * entries * iterations) + 1;
    friendRequests += `${randomId1}\t${randomId2}\n`;
  }
  await seedFriendRequests.write(friendRequests);
  await seedFriendRequests.end();
}

const createFriends = async () => {
  let friends = '';
  for (let i = 0; i < totalFriends; i++) {
    let randomId1 = Math.floor(Math.random() * entries * iterations) + 1;
    let randomId2 = Math.floor(Math.random() * entries * iterations) + 1;
    friends += `${randomId1}\t${randomId2}\n`;
    friends += `${randomId2}\t${randomId1}\n`;
  }
  await seedFriends.write(friends);
  await seedFriends.end();
}

const createSeedData = async () => {
  let start = new Date();
  await createGames();
  await createUsersConfirmationsAndHistories();
  await createFriendRequests();
  await createFriends();
  let end = new Date();
  await console.log(`generating data took ${Math.floor((end - start)/1000)} seconds`);
  await process.exit();
};

createSeedData();