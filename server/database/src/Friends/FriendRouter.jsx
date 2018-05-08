import express from 'express';

import { acceptFriendRequest, denyFriendRequest, friendRequest } from './FriendCtrl';

const router = express.Router();

router.route('/friendRequest')
  .post(friendRequest);

router.route('/validateFriendRequest')
  .delete(denyFriendRequest)
  .post(acceptFriendRequest);

export default router;