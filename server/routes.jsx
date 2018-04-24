import express from 'express';

import userRouter from './database/src/Users/UserRouter';
import gameRouter from './database/src/Games/GameRouter';
import perkRouter from './database/src/Perks/PerkRouter';
import resultRouter from './database/src/Result/ResultRouter';

const router = express.Router();

router.use('/user', userRouter);
// router.use('/game', gameRouter);  
// router.use('/perk', perkRouter);  //determine if this will be used
// router.use('/result', resultRouter);

export default router;
