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
const totalFriendRequests = 1000000;
const totalFriends = 600000;  //this number should not exceed (iterations * entries)/6.  But there's error handling so no worries

//confirmations, user_confirmations, histories, and user_histories rely on user data.  So it has to be made together
const createUsersConfirmationsAndHistories = async () => {
  console.log('starting createUsersConfirmationsAndHistories')
  let totalNumUsers = 0;
  let totalConfirmations = 0; //to keep track of confirmationId for user_confirmations
  let totalHistories = 0;

  for (let k = 0; k < iterations; k++) {
    let histIdNames = {}
    let users = '';

    //create users
    for (let i = 1; i < entries + 1; i++) {

      let username = faker.name.firstName() + faker.random.number() + faker.name.lastName() + faker.random.number();
      if (i === 1) {
        console.log(username)
      }
      let password = faker.random.word();
  
      histIdNames[totalNumUsers + i] = username;
      users += `${username}\t${password}\n`;
    };
    await seedUsers.write(users);
    console.log(users.length)
    users = '';

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
    await seedConfirmations.write(confirmations);
    await seedUserConfirmations.write(userConfirmations);
    confirmations = '';
    userConfirmations = '';

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

    await seedHistories.write(histories);
    await seedUserHistories.write(userHistories);
  }

  //tell computer that we are done adding
  await createUsersConfirmationsAndHistories();
  await console.log('ending createUsersConfirmationsAndHistories')
  await seedUsers.end();
  await seedConfirmations.end();
  await seedUserConfirmations.end();
  await seedHistories.end();
  await seedUserHistories.end();

  return true;
};

const createGames = async () => {
  console.log('creating createGames')
  let games = '';
  for (let i = 0; i < totalNumGames; i++) {
    let title = faker.random.word() + faker.random.number() + faker.random.word() + faker.random.number();
    let image = faker.image.imageUrl();
    games += `${title}\t${image}\n`;
  }
  await seedGames.write(games);
  await seedGames.end();
  await console.log('ending createGames')

  return true;
}

const createFriendRequests = async () => {
  await console.log('starting createFriendRequests')
  let friendRequests = '';
  for (let i = 0; i < totalFriendRequests; i++) {
    let randomId1 = Math.floor(Math.random() * entries * iterations) + 1;
    let randomId2 = Math.floor(Math.random() * entries * iterations) + 1;
    friendRequests += `${randomId1}\t${randomId2}\n`;
  }
  await seedFriendRequests.write(friendRequests);
  await seedFriendRequests.end();
  await console.log('ending createFriendRequests')

  return true;
}

//We need to make sure that the same user is not friended with the same person twice
const createFriends = async () => {
  await console.log('starting createFriends');

//test
  //split the userList by half
  let total = entries * iterations;
  let midpoint = total / 2;
  //start counter at beginning of the list
  let firstHalfUsers = midpoint;

  for (let i = 0; i < 75; i++) {
    let friends = '';
    let innerLimiter = 0;
    while (firstHalfUsers < total && innerLimiter < 10000) {
      //randomly increment the userId by 1-3
      firstHalfUsers += (Math.floor(Math.random() * 10) + 1);

      let friendHist = {}
      //randomly pair user with up to 20 friends
      let friendships = Math.floor(Math.random() * 20) + 1;
      for (let k = 0; k < friendships; k++) {
        //friendId will only randomly search the second half
        let secondHalfUsers = 1 + Math.floor(Math.random() * (midpoint - 1));
        //if friendId was already used, ignore
        if (friendHist[secondHalfUsers]) {
          continue;
        }
        friendHist[secondHalfUsers] = true;
        friends += `${firstHalfUsers}\t${secondHalfUsers}\n`;
        friends += `${secondHalfUsers}\t${firstHalfUsers}\n`;
      }
      innerLimiter += 1;
    }
    await seedFriends.write(friends);
  }

//end test

  // for (let i = 0; i < totalFriends; i++) {
  //   let randomId1 = Math.floor(Math.random() * entries * iterations) + 1;
  //   let randomId2 = Math.floor(Math.random() * entries * iterations) + 1;
  //   friends += `${randomId1}\t${randomId2}\n`;
  //   friends += `${randomId2}\t${randomId1}\n`;
  // }
  await seedFriends.end();
  await console.log('ending createFriends');

  return true
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

setTimeout( () => createSeedData(), 3000 );