import express from 'express';
import path from 'path';
import db from './database/index';
import routes from './routes';
import middleware from './middleware/middleware';

const app = express();
const port = process.env.port || 3666;

app.use(...middleware);

app.use('/api', routes);
app.use('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client/dist/index.html')));

app.listen(port, () => console.log('server is connected to port ', port));