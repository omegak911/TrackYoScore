import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';

const corsOptions = {
  origin: `http://localhost:3666`,
  methods: 'GET,POST,PUT,DELETE'
}

const middleware = [
  helmet(),
  cors(corsOptions),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  express.static(path.join(__dirname, '../../client/dist')),
  // passport.initialize(),
  // passport.session()
]

export default middleware;