import express from 'express';

import { searchUsers, updatePhoto, updateUser, userProfile } from './UserCtrl';

const router = express.Router();

router.route('/updateUser')
  .put(updateUser);

router.route('/updatePhoto')
  .put(updatePhoto);

router.route('/search')
  .get(searchUsers);

router.route('/profile')
  .get(userProfile);

export default router;