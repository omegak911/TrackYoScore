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
    case 'NEW_FRIEND_REQUESTS':
      return action.payload;
      break;
  }
  return state;
}

const friends = (state = [], action) => {
  switch(action.type) {
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

const historyConfirmations = (state = [], action) => {
  switch(action.type) {
    case 'NEW_HISTCONFIRMATION':
    return action.payload;
  }
  return state;
}

export { friends, historyConfirmations, userData, listOfUsers, pendingConfirmations, pendingFriendRequests };