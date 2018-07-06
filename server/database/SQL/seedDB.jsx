import path from 'path';

import { Friends, FriendRequests, Games, Histories, HistoryConfirmation, Perks, Users, UserPerks, UserHistories, UserHistoryConfirmations } from './index';
import db from '../index';

const seedData = async () => {
  await db.sync({ force: true })
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
    .then( async () => {
      let start = new Date();
      await db.query(`ALTER TABLE users DROP CONSTRAINT IF EXISTS "users_pkey" CASCADE`);
      await db.query(`ALTER TABLE users DROP CONSTRAINT IF EXISTS "users_username_key"`);
      await db.query(`ALTER TABLE games DROP CONSTRAINT IF EXISTS "games_pkey" CASCADE`);
      await db.query(`ALTER TABLE games DROP CONSTRAINT IF EXISTS "games_title_key"`);
      await db.query(`ALTER TABLE friends DROP CONSTRAINT IF EXISTS "friends_pkey"`);
      await db.query(`ALTER TABLE friends DROP CONSTRAINT IF EXISTS "friends_userId_friendId_key"`);
      await db.query(`ALTER TABLE friend_requests DROP CONSTRAINT IF EXISTS "friend_requests_pkey"`);
      await db.query(`ALTER TABLE friend_requests DROP CONSTRAINT IF EXISTS "friend_requests_friendId_userId_key"`);
      await db.query(`ALTER TABLE confirmations DROP CONSTRAINT IF EXISTS "confirmations_pkey" CASCADE`);
      await db.query(`ALTER TABLE user_confirmations DROP CONSTRAINT IF EXISTS "user_confirmations_pkey"`);
      await db.query(`ALTER TABLE histories DROP CONSTRAINT IF EXISTS "histories_pkey" CASCADE`);
      await db.query(`ALTER TABLE user_histories DROP CONSTRAINT IF EXISTS "user_histories_pkey"`);
      let end = new Date();
      await console.log(`dropping constraints took ${Math.floor((end - start)/1000)} seconds`);
    })
    .then( async () => {
      let start = new Date();
      await db.query(`COPY games (title, image) FROM '${path.join(__dirname, '/seedData/games.csv')}' DELIMITER '\t' CSV`);
      await console.log('copied games')
      await db.query(`COPY users (username, password, photo) FROM '${path.join(__dirname, '/seedData/users.csv')}' DELIMITER '\t' CSV`);
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
      await db.query(`ALTER TABLE users ADD CONSTRAINT "users_pkey" PRIMARY KEY (id)`);
      await db.query(`ALTER TABLE users ADD CONSTRAINT "users_username_key" UNIQUE (username)`);
      await db.query(`ALTER TABLE games ADD CONSTRAINT "games_pkey" PRIMARY KEY (id)`);
      await db.query(`ALTER TABLE games ADD CONSTRAINT "game_title_key" UNIQUE (title)`);

      await db.query(`ALTER TABLE friends ADD CONSTRAINT "friends_pkey" PRIMARY KEY (id)`);
      await db.query(`ALTER TABLE friends ADD CONSTRAINT "friends_userId_friendId_key" UNIQUE ("userId", "friendId")`);
      await db.query(`ALTER TABLE friends ADD FOREIGN KEY ("friendId") REFERENCES users ON UPDATE CASCADE ON DELETE CASCADE`);
      await db.query(`ALTER TABLE friends ADD FOREIGN KEY ("userId") REFERENCES users ON UPDATE CASCADE ON DELETE CASCADE`);
      
      await db.query(`ALTER TABLE friend_requests ADD CONSTRAINT "friend_requests_pkey" PRIMARY KEY (id)`);
      await db.query(`ALTER TABLE friend_requests ADD CONSTRAINT "friend_requests_friendId_userId_key" UNIQUE ("friendId", "userId")`);
      await db.query(`ALTER TABLE friend_requests ADD FOREIGN KEY ("friendId") REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE`);
      await db.query(`ALTER TABLE friend_requests ADD FOREIGN KEY ("userId") REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE`);

      await db.query(`ALTER TABLE confirmations ADD CONSTRAINT "confirmations_pkey" PRIMARY KEY (id)`);
      await db.query(`ALTER TABLE confirmations ADD FOREIGN KEY ("gameId") REFERENCES games(id) ON UPDATE CASCADE ON DELETE CASCADE`);
      await db.query(`ALTER TABLE user_confirmations ADD CONSTRAINT "user_confirmations_pkey" PRIMARY KEY ("userId", "confirmationId")`);
      await db.query(`ALTER TABLE user_confirmations ADD FOREIGN KEY ("confirmationId") REFERENCES confirmations(id) ON UPDATE CASCADE ON DELETE CASCADE`);
      await db.query(`ALTER TABLE user_confirmations ADD FOREIGN KEY ("userId") REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE`);

      await db.query(`ALTER TABLE histories ADD CONSTRAINT "histories_pkey" PRIMARY KEY (id)`);
      await db.query(`ALTER TABLE histories ADD FOREIGN KEY ("gameId") REFERENCES games(id) ON UPDATE CASCADE ON DELETE CASCADE`);
      await db.query(`ALTER TABLE user_histories ADD CONSTRAINT "user_histories_pkey" PRIMARY KEY (id)`);
      await db.query(`ALTER TABLE user_histories ADD FOREIGN KEY ("historyId") REFERENCES histories(id) ON UPDATE CASCADE ON DELETE SET NULL`);
      await db.query(`ALTER TABLE user_histories ADD FOREIGN KEY ("userId") REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL`);
      let end = new Date();
      await console.log(`adding constraints took ${Math.floor((end - start)/1000)} seconds`);
      await process.exit();
    })
    .catch((err) => console.log('error syncing database: ', err));
};

seedData();