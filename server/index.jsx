import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
//import router

const app = express();
const port = process.env.port || 3666;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

// app.use(router)

app.use('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client/dist/index.html')));

app.listen(port, () => console.log('server is connected to port ', port));