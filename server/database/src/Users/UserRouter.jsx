import express from 'express';

import { createUser, updateUser, validateUser } from './UserCtrl';

const router = express.Router();

router.route('/signup')
  .post(createUser);

router.route('/login')
  .get(validateUser);

router.route('/updateUser')
  .put(updateUser);

export default router;