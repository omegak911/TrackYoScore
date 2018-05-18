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
        console.log('invalid user')
        req.message = 'invalid username';
        return done(null, false);
      }
      if (user.dataValues.password !== password) {
        console.log('invalid password')
        req.message = 'invalid password'
        return done(null, false);
      }
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
  .get(passport.authenticate('local', { failWithError: true }), (req, res, next) => {
    res.status(200).send(req.user)
  }, (err, req, res, next) => {
    res.status(200).send(req.message)
  }
  );

router.route('/isLoggedin')
  .get((req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).send(req.user);
    } else {
      res.status(200).send('404: Forbidden')
    }
  });

export default router;