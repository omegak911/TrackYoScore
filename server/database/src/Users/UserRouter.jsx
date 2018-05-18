import express from 'express';

import { searchUsers, updateUsername, userProfile } from './UserCtrl';

const router = express.Router();

router.route('/updateUsername')
  .put(updateUsername);

router.route('/search')
  .get(searchUsers);

router.route('/profile')
  .get(userProfile);

export default router;