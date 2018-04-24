import express from 'express';
import { addGame, fetchGame } from './GameCtrl';

const router = express.Router();

router.route('/add')
  .post(addGame);

router.route('/fetch')
  .get(fetchGame);

export default router;