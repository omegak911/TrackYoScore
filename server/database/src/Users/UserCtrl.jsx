import { createUserHelper, searchUsersHelper, userProfileHelper, validateUserHelper } from './UserHelper';
import levelHelper from './LevelHelper'; 

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

const searchUsers = (req, res) => {
  //check if user is logged in
  searchUsersHelper(req.query, (result) => {
    res.status(201).send(result);
  })
}

const updateUsername = async (req, res) => {
  //need passport for req.user
  //req.user should contain username + password
  //req.body should contain new username

  // await updateUserHelper(req.body, (result) => {
  //   res.status(201).send(result)});
};

const userProfile = (req, res) => {
  //check if user logged in
  console.log(req.query)
  userProfileHelper(req.query, (result) => {
    res.status(200).send(result);
  })
}

const validateUser = (req, res) => {
  //req.body should contain username and password

  validateUserHelper(req.query, (result) => {
    //null if not found
    const data  = result === null ? 'invalid' : result
    res.status(200).send(data);
  });
};

export { createUser, searchUsers, updateUsername, userProfile, validateUser };