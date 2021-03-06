import express from 'express';

import authRouter from './database/src/Auth/AuthRouterAndCtrl';
import gateway from './middleware/gateway';
import userRouter from './database/src/Users/UserRouter';
import gameRouter from './database/src/Games/GameRouter';
// import perkRouter from './database/src/Perks/PerkRouter';
import historyRouter from './database/src/Histories/HistoryRouter';
import friendRouter from './database/src/Friends/FriendRouter';

const router = express.Router();

router
  .use('/auth', authRouter)
  .use(gateway)
  .use('/user', userRouter)
  .use('/game', gameRouter)
  .use('/friend', friendRouter)
  .use('/history', historyRouter);
  
// router.use('/perk', perkRouter);  //determine if this will be used
export default router;
