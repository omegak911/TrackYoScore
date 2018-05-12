const searchedUsers = data => ({
  type: 'USER_LIST',
  payload: data
});

const updateUserData = data => ({
  type: 'USER_DATA',
  payload: data,
});

const updatePendingFriendRequests = data => ({
  type: 'NEW_FRIEND_REQUESTS',
  payload: data,
});

const updateFriendList = data => ({
  type: 'NEW_FRIENDLIST',
  payload: data,
});

const updatePendingHistConfirmations = data => ({
  type: 'NEW_HISTCONFIRMATION',
  payload: data,
});

export { searchedUsers, updateUserData, updatePendingFriendRequests, updateFriendList, updatePendingHistConfirmations };