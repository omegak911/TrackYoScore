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
    case 'LOGOUT':
      return null;
  }
  return state;
}

const pendingFriendRequests = (state = [], action) => {
  switch(action.type) {
    case 'NEW_FRIEND_REQUESTS':
      return action.payload;
    case 'LOGOUT':
      return [];
  }
  return state;
}

const friends = (state = [], action) => {
  switch(action.type) {
    case 'NEW_FRIENDLIST':
      return action.payload;
    case 'LOGOUT':
      return [];
  }
  return state;
}

// const pendingConfirmations = (state = [], action) => {
//   switch(action.type) {
//     case 'USER_DATA':
//       return action.payload.confirmationNeeded;
//     case 'LOGOUT':
//       return [];
//   }
//   return state;
// }

const listOfUsers = (state = [], action) => {
  switch(action.type) {
    case 'LOGOUT':
      return [];
  }
  return state;
}

const historyConfirmations = (state = [], action) => {
  switch(action.type) {
    case 'NEW_HISTCONFIRMATION':
      return action.payload;
    case 'LOGOUT':
      return [];
  }
  return state;
}

const selectedGame = (state = { title: '', image: '', id: null }, action) => {
  switch(action.type) {
    case 'SELECTED_GAME':
      return action.payload;
  }
  return state;
}

export { friends, historyConfirmations, userData, listOfUsers, pendingFriendRequests, selectedGame };