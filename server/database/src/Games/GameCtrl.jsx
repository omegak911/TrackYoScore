import { addGameHelper, fetchGameHelper } from './GameHelper';

const addGame = (req, res) => {
  //req.body should contain title and image url
  //check if user is logged in before doing anything
  addGameHelper(req.body, (result) => {
    console.log('addGame result: ', result);

    res.status(201).send('Game added')
  })
}

const fetchGame = (req, res) => {
  //if user is logged in

  fetchGameHelper(result => {
    console.log('fetchGame result: ', result)

    res.status(200).send('result');
  })
}

export { addGame, fetchGame };