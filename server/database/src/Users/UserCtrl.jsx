import { createUserHelper, updateUserHelper, validateUserHelper } from './UserHelper';

const createUser = (req, res) => {
  //req.body should contain username and password

  createUserHelper(req.body, (result) => {
    console.log('create User result: ', result);
    // if (result.password) {
    //   delete result.password;
    // }
    // res.status(201).send(result);

    res.status(201).send('result');
  })
}

const updateUser = (req, res) => {
  //need passport for req.user
  //req.user should contain username
  //req.body should contain data object containing update key/values

  updateUserHelper(req.body, (result) => {
    console.log('update User result: ', result);
  //returns and array with length of 1 if success
    res.status(201).send('result');
  })
}

const validateUser = (req, res) => {
  //req.body should contain username and password

  validateUserHelper(req.query, (result) => {
    console.log('validate user result: ', result);
    //null if not found
    res.status(200).send(result);
  })
}

export { createUser, searchUsers, updateUser, validateUser };