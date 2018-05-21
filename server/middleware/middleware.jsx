import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import path from 'path';
import session from 'express-session'

const corsOptions = {
  origin: `http://localhost:3666`,
  methods: 'GET,POST,PUT,DELETE'
}

const sessionOptions = {
  secret: 'track-enabled-now',
  cookie: { maxAge: 300000 },  //five minute
  resave: false,
  saveUninitialized: false,
}

const middleware = [
  helmet(),
  cors(corsOptions),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  session(sessionOptions),
  passport.initialize(),
  passport.session()
]

export default middleware;