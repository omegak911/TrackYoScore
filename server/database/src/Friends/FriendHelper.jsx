import { Friends, FriendRequests } from '../../SQL/index';

const addFriendHelper = ({ requestorId, requesteeId }, callback) =>
  Friends.create({
    userOneId: requestorId,
    userTwoId: requesteeId
  })
  .then(() => callback())
  .catch(err => console.log(err));

const friendRequestHelper = ({ requestorId, requesteeId }, callback) =>
  FriendRequests.create({
    requestorId,
    requesteeId,
  })
  .then(result => callback(result))
  .catch(err => console.log(err));

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
  .catch(err => console.log(err));

export { addFriendHelper, friendRequestHelper, removeFriendRequest };