import fs from 'fs';
import faker from 'faker';
import path from 'path';

import db from '../index';

const seedUsers = fs.createWriteStream('./server/database/SQL/seedData/users.csv');
const seedConfirmations = fs.createWriteStream('./server/database/SQL/seedData/confirmations.csv');
const seedUserConfirmations = fs.createWriteStream('./server/database/SQL/seedData/userConfirmations.csv');
const seedHistories = fs.createWriteStream('./server/database/SQL/seedData/histories.csv');
const seedUserHistories = fs.createWriteStream('./server/database/SQL/seedData/userHistories.csv');
const seedGames = fs.createWriteStream('./server/database/SQL/seedData/games.csv');
const seedFriendRequests = fs.createWriteStream('./server/database/SQL/seedData/friendRequests.csv');
const seedFriends = fs.createWriteStream('./server/database/SQL/seedData/friends.csv');
//seed update users?

const defaultPics = ['Eevee', 'Charizard', 'Magicarp', 'Pikachu', 'Gastly', 'Caterpie', 'Venusaur', 'Snorlax', 'Blastoise']
const defaultPicsLength = defaultPics.length;

const iterations = 20;
const entries = 200000;  //equals users per iteration, confirmation + histories are entries/20 per iteration

const totalNumGames = 11;
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
      let photo = defaultPics[Math.floor(Math.random() * defaultPicsLength)]
  
      histIdNames[totalNumUsers + i] = username;
      users += `${username}\t${password}\t${photo}_Art\n`;
    };
    await seedUsers.write(users);
    users = '';

    totalNumUsers += entries;   //we only create userIds within how many users have been created

    //create confirmations
    //randomId's for confirmation and hist are not unique
    let confirmations = '';
    let userConfirmations = '';
    for (let m = 0; m < entries/50; m++) {
      let section = totalNumUsers/4;
      //pick from the first million
      let randomId1 = Math.floor(Math.random() * section) + 1;
      //pick from the 2nd million
      let randomId2 = section + Math.floor(Math.random() * section) + 1;
      //etc
      let randomId3 = section * 2 + Math.floor(Math.random() * section) + 1;
      //etc
      let randomId4 = section * 3 + Math.floor(Math.random() * section) + 1;
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
    for (let m = 0; m < entries/30; m++) {
      let section = totalNumUsers/4;
      //pick from the first million
      let randomId1 = Math.floor(Math.random() * section) + 1;
      //pick from the 2nd million
      let randomId2 = section + Math.floor(Math.random() * section) + 1;
      //etc
      let randomId3 = section * 2 + Math.floor(Math.random() * section) + 1;
      //etc
      let randomId4 = section * 3 + Math.floor(Math.random() * section) + 1;
      let randomGame = Math.floor(Math.random() * totalNumGames) + 1;
      if (randomId1 === randomId2) {
        randomId2 += 1;
      } 
      if (randomId2 === randomId3) {
        randomId3 += 1;
      }
      if (randomId3 === randomId4) {
        randomId4 += 1;
      }
      totalHistories += 1;
      histories += `${randomGame}\t"{""${randomId1}"": {""username"":""${histIdNames[randomId1]}"",""score"":10},""${randomId2}"":{""username"":""${histIdNames[randomId2]}"",""score"":5},""${randomId3}"":{""username"":""${histIdNames[randomId3]}"",""score"":10},""${randomId4}"":{""username"":""${histIdNames[randomId4]}"",""score"":5}}"\n`
      userHistories += `${totalHistories}\t${randomId1}\n${totalHistories}\t${randomId2}\n${totalHistories}\t${randomId3}\n${totalHistories}\t${randomId4}\n`;
    }

    await seedHistories.write(histories);
    await seedUserHistories.write(userHistories);
  }

  //tell computer that we are done adding
  await console.log('ending createUsersConfirmationsAndHistories')
  await seedUsers.end();
  await seedConfirmations.end();
  await seedUserConfirmations.end();
  await seedHistories.end();
  await seedUserHistories.end();

  return true;
};

const gamesFromCloud = [
  'Mario Kart 8',
  'Chess',
  'Fortnite',
  'Overwatch',
  'Taboo',
  'Exploding Kittens',
  'Basketball',
  'Hearthstone',
  'DOTA 2',
  'Beerpong',
  'Super Smash Bros 64',
]

const createGames = async () => {
  console.log('creating createGames')
  let games = '';
  for (let i = 0; i < gamesFromCloud.length; i++) {
    let title = gamesFromCloud[i];
    let image = gamesFromCloud[i];
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
    while (firstHalfUsers < (total - 10)  && innerLimiter < 10000) {
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
  //process.exit() will exit the command line but also break all the writes before they finish.
  //process.exit() will only work if is invoked afte a .then()
};

createSeedData()