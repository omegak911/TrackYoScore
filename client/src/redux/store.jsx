import { combineReducers } from 'redux';

import { friends, historyConfirmations, userData, listOfUsers, pendingFriendRequests, selectedGame } from './reducers/userReducer';

const allReducers = combineReducers({
  friends,
  historyConfirmations,
  userData,
  listOfUsers,
  // pendingConfirmations,
  pendingFriendRequests,
  selectedGame
})

export default allReducers;
