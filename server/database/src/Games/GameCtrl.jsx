import { addGameHelper, fetchGameHelper } from './GameHelper';

const addGame = (req, res) => {
  //req.body should contain title and image url
  //check if user is logged in before doing anything
  const { id } = req.session.passport.user;
  if (id) {
    addGameHelper(req.body, (result) => {
      console.log('addGame result: ', result);
  
      res.status(201).send('Game added')
    })
  } else {
    res.redirect('/');
  }
  
}

const fetchGame = (req, res) => {
  const { id } = req.session.passport.user;
  if (id) {
    fetchGameHelper( async result => {
      // console.log(result)
      let games = [];
      for (let i = 0; i < result.length; i++) {
        console.log(result[i].dataValues)
        games.push(result[i].dataValues)
      }
      await res.status(200).send(games);
    });
  } else {
    res.redirect('/');
  }
}

export { addGame, fetchGame };