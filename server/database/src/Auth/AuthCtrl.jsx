import { createUserHelper, validateUserHelper } from './AuthHelper';

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

const validateUser = (req, res) => {
  //req.body should contain username and password

  validateUserHelper(req.query, (result) => {
    //null if not found
    const data  = result === null ? 'invalid' : result
    res.status(200).send(data);
  });
};

export { createUser, validateUser };