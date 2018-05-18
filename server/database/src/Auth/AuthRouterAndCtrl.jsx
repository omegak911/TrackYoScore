import passport from 'passport';
import passportLocal from 'passport-local';
import express from 'express';

import { createUserHelper, validateUserHelper } from './AuthHelper';

const router = express.Router();
const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({
  passReqToCallback: true,
}, (req, username, password, done) => {
    validateUserHelper(username, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.dataValues.password !== password) {
        return done(null, false, { message: 'Incorrect password' });
      }
      // res.user = user;
      delete user.dataValues.password;
      return done(null, user.dataValues);
    })
  }
))

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

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

// router.route('/signup')
//   .post(passport.authenticate('local', (err, req, res, next) => 
//     res.status(201).send(req)
//   ));

router.route('/login')
  .get(passport.authenticate('local'), (req, res, next) =>
    res.status(200).send(req.user)
  );

export default router;