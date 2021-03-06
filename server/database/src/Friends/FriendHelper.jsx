import { Friends, FriendRequests } from '../../SQL/index';

const addFriendHelper = ({ friendId, userId }, callback) => {
  Friends.create({
    userId: friendId,
    friendId: userId
  })
  .then(() => console.log('created friend'))
  .catch(err => console.log('addFriendHelper error'));

  return Friends.create({
    userId,
    friendId,
  })
  .then(() => callback())
  .catch(err => console.log(err));
}

const friendRequestHelper = (friendId, userId, callback) =>
  FriendRequests.create({
    friendId,
    userId,
  })
  .then(result => callback(null, 'success'))
  .catch(err => callback('fail', null));

const removeFriendRequest = ({ id }, callback) =>
  FriendRequests.findOne({
    where: { id },
    raw: true,
  })
  .then(result =>
    FriendRequests.destroy({
      where: { id },
    })
    .then(() => callback(result))
    .catch(err => console.log(err)))
  .catch(err => console.log('removeFriendRequest error'));

export { addFriendHelper, friendRequestHelper, removeFriendRequest };