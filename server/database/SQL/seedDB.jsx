import path from 'path';

import { Friends, FriendRequests, Games, Histories, HistoryConfirmation, Perks, Users, UserPerks, UserHistories, UserHistoryConfirmations } from './index';
import db from '../index';

const seedData = async () => {
  await db.sync()
    .then( async () => {
      console.log('db synced')
      //clean out all tables (order is important)
      let start = new Date();
      await UserHistories.truncate({ restartIdentity: true, cascade: true });
      await UserHistoryConfirmations.truncate({ restartIdentity: true, cascade: true });
      await HistoryConfirmation.truncate({ restartIdentity: true, cascade: true });
      await Histories.truncate({ restartIdentity: true, cascade: true });
      await Friends.truncate({ restartIdentity: true, cascade: true });
      await FriendRequests.truncate({ restartIdentity: true, cascade: true });
      await Games.truncate({ restartIdentity: true, cascade: true });
      await Users.truncate({ restartIdentity: true, cascade: true });
      let end = new Date();
      await console.log(`deleting data from tables took ${Math.floor((end - start)/1000)} seconds`);  
    })
    // .then( async () => { //this duplicate add foreign key eliminates any possible constraint errors from the drop after
    //   let start = new Date();
    //   await db.query(`ALTER TABLE user_confirmations ADD FOREIGN KEY ("confirmationId") REFERENCES confirmations`);
    //   await db.query(`ALTER TABLE user_confirmations ADD FOREIGN KEY ("userId") REFERENCES users`);
    //   await db.query(`ALTER TABLE user_histories ADD FOREIGN KEY ("historyId") REFERENCES histories`);
    //   await db.query(`ALTER TABLE user_histories ADD FOREIGN KEY ("userId") REFERENCES users`);
    //   await db.query(`ALTER TABLE friend_requests ADD FOREIGN KEY ("friendId") REFERENCES users`);
    //   await db.query(`ALTER TABLE friend_requests ADD FOREIGN KEY ("userId") REFERENCES users`);
    //   await db.query(`ALTER TABLE friends ADD FOREIGN KEY ("friendId") REFERENCES users`);
    //   await db.query(`ALTER TABLE friends ADD FOREIGN KEY ("userId") REFERENCES users`);
    //   let end = new Date();
    //   await console.log(`intial constraints restore took ${Math.floor((end - start)/1000)} seconds`);
    // })
    .then( async () => {
      let start = new Date();
      await db.query(`ALTER TABLE user_confirmations DROP CONSTRAINT IF EXISTS "user_confirmations_confirmationId_fkey"`);
      await db.query(`ALTER TABLE user_confirmations DROP CONSTRAINT IF EXISTS "user_confirmations_userId_fkey"`);
      await db.query(`ALTER TABLE user_histories DROP CONSTRAINT IF EXISTS "user_histories_historyId_fkey"`);
      await db.query(`ALTER TABLE user_histories DROP CONSTRAINT IF EXISTS "user_histories_userId_fkey"`);
      await db.query(`ALTER TABLE friend_requests DROP CONSTRAINT IF EXISTS "friend_requests_userId_fkey"`);
      await db.query(`ALTER TABLE friend_requests DROP CONSTRAINT IF EXISTS "friend_requests_friendId_fkey"`);
      await db.query(`ALTER TABLE friends DROP CONSTRAINT IF EXISTS "friends_userId_fkey"`);
      await db.query(`ALTER TABLE friends DROP CONSTRAINT IF EXISTS "friends_friendId_fkey"`);
      let end = new Date();
      await console.log(`dropping constraints took ${Math.floor((end - start)/1000)} seconds`);
    })
    .then( async () => {
      let start = new Date();
      await db.query(`COPY games (title, image) FROM '${path.join(__dirname, '/seedData/games.csv')}' DELIMITER '\t' CSV`);
      await console.log('copied games')
      await db.query(`COPY users (username, password) FROM '${path.join(__dirname, '/seedData/users.csv')}' DELIMITER '\t' CSV`);
      await console.log('copied users')
      await db.query(`COPY confirmations ("gameId", "playerScore", validation) FROM '${path.join(__dirname, '/seedData/confirmations.csv')}' DELIMITER '\t' CSV`);
      await console.log('copied confirmations');
      await db.query(`COPY user_confirmations ("confirmationId", "userId") FROM '${path.join(__dirname, './seedData/userConfirmations.csv')}' DELIMITER '\t' CSV`);
      let mid1 = new Date();
      await console.log(`copying user_confirmations took ${Math.floor(((mid1 - start)/1000)/60)} minutes`);
      await db.query(`COPY histories ("gameId", "playerScore") FROM '${path.join(__dirname, '/seedData/histories.csv')}' DELIMITER '\t' CSV`);
      await db.query(`COPY user_histories ("historyId", "userId") FROM '${path.join(__dirname, './seedData/userHistories.csv')}' DELIMITER '\t' CSV`);
      let mid2 = new Date();
      await console.log(`copying user_histories took ${Math.floor(((mid2 - start)/1000)/60)} minutes`);
      await db.query(`COPY friend_requests ("friendId", "userId") FROM '${path.join(__dirname, '/seedData/friendRequests.csv')}' DELIMITER '\t' CSV`);
      await db.query(`COPY friends ("friendId", "userId") FROM '${path.join(__dirname, './seedData/friends.csv')}' DELIMITER '\t' CSV`);
      let end = new Date();
      await console.log(`seeding data took ${Math.floor(((end - start)/1000)/60)} minutes`);
    })
    .then( async ()=>{
      let start = new Date();
      await db.query(`ALTER TABLE user_confirmations ADD FOREIGN KEY ("confirmationId") REFERENCES confirmations`);
      await db.query(`ALTER TABLE user_confirmations ADD FOREIGN KEY ("userId") REFERENCES users`);
      await db.query(`ALTER TABLE user_histories ADD FOREIGN KEY ("historyId") REFERENCES histories`);
      await db.query(`ALTER TABLE user_histories ADD FOREIGN KEY ("userId") REFERENCES users`);
      await db.query(`ALTER TABLE friend_requests ADD FOREIGN KEY ("friendId") REFERENCES users`);
      await db.query(`ALTER TABLE friend_requests ADD FOREIGN KEY ("userId") REFERENCES users`);
      await db.query(`ALTER TABLE friends ADD FOREIGN KEY ("friendId") REFERENCES users`);
      await db.query(`ALTER TABLE friends ADD FOREIGN KEY ("userId") REFERENCES users`);
      let end = new Date();
      await console.log(`adding constraints took ${Math.floor((end - start)/1000)} seconds`);
      await process.exit();
    })
    .catch((err) => console.log('error syncing database: ', err));
};

seedData();