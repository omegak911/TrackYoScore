import { addFriendHelper, friendRequestHelper, removeFriendRequest } from './FriendHelper';

const acceptFriendRequest = (req, res) => {
  const { id } = req.session.passport.user;
  if (id) {
  removeFriendRequest(req.body, (result) =>
    addFriendHelper(result, () => res.status(201).send('accepted')));
  }
}

const denyFriendRequest = (req, res) => {
  const { id } = req.session.passport.user;
  if (id) {
  removeFriendRequest(req.body, () => res.status(200).send('denied'))
  }
}

const friendRequest = (req, res) => {
  const { id } = req.session.passport.user;
  if (id) {
    friendRequestHelper(id, req.body.requesteeId, (err, result) => {
      if (err) {
        res.status(201).send(err);
      } else {
        res.status(201).send(result);
      }
    })
  }
}

export { acceptFriendRequest, denyFriendRequest, friendRequest };