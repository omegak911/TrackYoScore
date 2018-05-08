import { addFriendHelper, friendRequestHelper, removeFriendRequest } from './FriendHelper';

const acceptFriendRequest = (req, res) => {
  //check if user is logged in
  removeFriendRequest(req.body, (result) =>
    addFriendHelper(result, () => res.status(201).send('accepted')));
}

const denyFriendRequest = (req, res) => {
  //check if user is logged in
  removeFriendRequest(req.body, () => res.status(200).send('denied'))
}

const friendRequest = (req, res) => {
  //check if user is logged in
  friendRequestHelper(req.body, (result) => res.status(201).send('submitted request'));
}

export { acceptFriendRequest, denyFriendRequest, friendRequest };