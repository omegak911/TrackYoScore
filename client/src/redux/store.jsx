import { combineReducers } from 'redux';

import userReducer from './reducers/userReducer';

const allReducers = combineReducers({
  user_data: userReducer,
})

export default allReducers;
