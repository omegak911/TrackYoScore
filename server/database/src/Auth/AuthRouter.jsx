import express from 'express';

import { createUser, validateUser } from './AuthCtrl';

const router = express.Router();

router.route('/signup')
  .post(createUser);

router.route('/login')
  .get(validateUser);

export default router;