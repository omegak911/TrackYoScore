import { combineReducers } from 'redux';

import { userData, listOfUsers } from './reducers/userReducer';

const allReducers = combineReducers({
  userData,
  listOfUsers,
})

export default allReducers;
