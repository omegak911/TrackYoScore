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
  const { id } = req.session.passport.user;
  if (id) {
    fetchGameHelper( async result => {
      console.log('fetchGame result: ', result)
  
      const filteredResult = result.map(game => {
        return { 
          title: game.title, 
          image: game.image 
        }
      })
      await res.status(200).send(filteredResult);
    });
  } else {
    res.redirect('/');
  }
}

export { addGame, fetchGame };