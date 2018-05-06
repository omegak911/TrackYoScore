const userData = (state = null, action) => {
  switch(action.type) {
    case 'USER_DATA': 
      return action.payload;
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

export { userData, listOfUsers };