import bcrypt from 'bcryptjs';
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
        req.message = 'invalid username';
        return done(null, false);
      }
      bcrypt.compare(password, user.dataValues.password, (err, isMatch) => {
        if (err) {
          req.message = 'invalid password';
          return done(null, false);
        } 
        if (isMatch) {
          delete user.dataValues.password;
          return done(null, user.dataValues);
        }
      })
    })
  }
))

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const createUser = (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) console.log(err);
      req.body.password = hash;
      createUserHelper(req.body, (result) => {
        if (result.password) {
          delete result.password;
        }
        res.status(201).send(result);
      })
    })
  })
}

router.route('/signup')
  .post(createUser);

router.route('/login')
  .get(passport.authenticate('local', { failWithError: true }), (req, res, next) => {
    res.status(200).send(req.user)
  }, (err, req, res, next) => {
    res.status(200).send(req.message)
  });

router.route('/logout')
  .post((req, res) => {
    req.logout();
    res.status(201).redirect('/');
  })

router.route('/isLoggedin')
  .get((req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).send(req.user);
    } else {
      res.status(200).send('404: Forbidden')
    }
  });

export default router;