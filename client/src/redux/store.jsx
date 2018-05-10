import { combineReducers } from 'redux';

import { friends, userData, listOfUsers, pendingConfirmations, pendingFriendRequests } from './reducers/userReducer';

const allReducers = combineReducers({
  friends,
  userData,
  listOfUsers,
  pendingConfirmations,
  pendingFriendRequests,
})

export default allReducers;
