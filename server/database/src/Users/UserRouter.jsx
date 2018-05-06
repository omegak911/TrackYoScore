import express from 'express';

import { createUser, searchUsers, updateUsername, userProfile, validateUser } from './UserCtrl';

const router = express.Router();

router.route('/signup')
  .post(createUser);

router.route('/login')
  .get(validateUser);

router.route('/updateUsername')
  .put(updateUsername);

router.route('/search')
  .get(searchUsers);

router.route('/profile')
  .get(userProfile);

export default router;