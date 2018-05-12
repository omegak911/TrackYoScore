import { combineReducers } from 'redux';

import { friends, historyConfirmations, userData, listOfUsers, pendingConfirmations, pendingFriendRequests } from './reducers/userReducer';

const allReducers = combineReducers({
  friends,
  historyConfirmations,
  userData,
  listOfUsers,
  pendingConfirmations,
  pendingFriendRequests,
})

export default allReducers;
