const searchedUsers = data => ({
  type: 'USER_LIST',
  payload: data
});

const updateUserData = data => ({
  type: 'USER_DATA',
  payload: data,
});

export { searchedUsers, updateUserData };