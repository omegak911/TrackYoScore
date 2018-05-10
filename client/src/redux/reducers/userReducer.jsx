const userData = (state = null, action) => {
  switch(action.type) {
    case 'USER_DATA': 
      return {
        id: action.payload.id,
        username: action.payload.username,
        currentEXP: action.payload.currentEXP,
        nextLevelEXP: action.payload.nextLevelEXP,
        wins: action.payload.wins,
        losses: action.payload.losses,
      }
  }
  return state;
}

const pendingFriendRequests = (state = [], action) => {
  switch(action.type) {
    case 'USER_DATA': 
      return action.payload.friendRequests;
      break;
    case 'NEW_FRIEND_REQUESTS':
      return action.payload;
      break;
  }
  return state;
}

const friends = (state = [], action) => {
  switch(action.type) {
    case 'USER_DATA': 
      return action.payload.friendsList;
      break;
    case 'NEW_FRIENDLIST':
      return action.payload;
      break;
  }
  return state;
}

const pendingConfirmations = (state = [], action) => {
  switch(action.type) {
    case 'USER_DATA':
      return action.payload.confirmationNeeded;
  }
  return state;
}

const listOfUsers = (state = [], action) => {
  switch(action.type) {
    case 'USER_LIST': 
      return action.payload;
  }
  return state;
}

export { friends, userData, listOfUsers, pendingConfirmations, pendingFriendRequests };