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

const logout = () => ({
  type: 'LOGOUT'
})

const selectGame = data => ({
  type: 'SELECTED_GAME',
  payload: data,
})

export { logout, selectGame, updateUserData, updatePendingFriendRequests, updateFriendList, updatePendingHistConfirmations };