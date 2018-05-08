import express from 'express';

import userRouter from './database/src/Users/UserRouter';
import gameRouter from './database/src/Games/GameRouter';
// import perkRouter from './database/src/Perks/PerkRouter';
import historyRouter from './database/src/Histories/HistoryRouter';
import friendRouter from './database/src/Friends/FriendRouter';

const router = express.Router();

router.use('/user', userRouter);
router.use('/game', gameRouter);
router.use('/friend', friendRouter);
// router.use('/perk', perkRouter);  //determine if this will be used
router.use('/history', historyRouter);

export default router;
