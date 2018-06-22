import express from 'express';

import { searchUsers, updatePhoto, updateUsername, userProfile } from './UserCtrl';

const router = express.Router();

router.route('/updateUsername')
  .put(updateUsername);

router.route('/updatePhoto')
  .put(updatePhoto);

router.route('/search')
  .get(searchUsers);

router.route('/profile')
  .get(userProfile);

export default router;