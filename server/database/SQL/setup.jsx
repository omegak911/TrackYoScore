//import and invoke functions here to drop and make tables
//DO NOT EXPORT THIS FILE
//instead, create a script in package.json to run when needed

import db from '../index';
import { Games, History, HistoryConfirmation, Perks, Users, UserPerks, UserHistories, TempUserHistories } from './index';

db.sync({ force: true })
  .then(() => {
    console.log('db synced');
    process.exit();
  })
  .catch(() => {
    console.log('error syncing database');
  });