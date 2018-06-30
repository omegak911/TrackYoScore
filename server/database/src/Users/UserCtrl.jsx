import { searchUsersHelper, userProfileHelper, updatePhotoHelper, updateUserHelper } from './UserHelper';
import levelHelper from './LevelHelper'; 

import bcrypt from 'bcryptjs';

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

const updateUser = async (req, res) => {
  //probably iterate thru req.body and add to a data object if it's not ''
  console.log('reached in here')
  const { id } = req.session.passport.user;

  // updateUserHelper(id, , (result) => {
  //   console.log('updateUserHelper result: ', result)
  //   res.status(201).send('success');
  // });

  //will need this if they're updating passwords
  //update function to dynamically update necessary fields
  // bcrypt.genSalt(10, (err, salt) => {
  //   bcrypt.hash(req.body.password, salt, (err, hash) => {
  //     if (err) console.log(err);
  //     let password = hash;

  //   })
  // })

  
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

export { searchUsers, updateUser, updatePhoto, userProfile };