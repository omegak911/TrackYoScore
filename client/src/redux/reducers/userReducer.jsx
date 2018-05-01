const reducer = (state = null, action) => {
  switch(action.type) {
    case 'USER_DATA': 
      return action.payload;
      break;
  }
  return state;
}

export default reducer;