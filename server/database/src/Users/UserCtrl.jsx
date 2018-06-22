import { searchUsersHelper, userProfileHelper, updatePhotoHelper } from './UserHelper';
import levelHelper from './LevelHelper'; 

const searchUsers = (req, res) => {
  //check if user is logged in
  searchUsersHelper(req.query, (result) => {
    res.status(201).send(result);
  })
}

const updatePhoto = (req, res) => {
  const { id } = req.session.passport.user;
  if (id) {
    console.log('updatePhotowith: ', req.body)
    updatePhotoHelper(id, req.body, (result) => {
      res.status(201).send(result);
    })
  }
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
  console.log('in userProfile function: ', req.url)
  console.log(req.query)
  userProfileHelper(req.query, (result) => {
    res.status(200).send(result);
  })
}

export { searchUsers, updateUsername, updatePhoto, userProfile };