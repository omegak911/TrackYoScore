const searchedUsers = data => ({
  type: 'USER_LIST',
  payload: data
});

const userData = data => ({
  type: 'USER_DATA',
  payload: data,
});

export { searchedUsers, userData };