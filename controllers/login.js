const webtoken = require('jsonwebtoken');
const router = require('express').Router();
const { SECRET } = require('../util/config');
const User = require('../models/user');

router.post('/', async (request, response) => {
  const credentials = request.body;

  const user = await User.findOne({
    where: {
      username: credentials.username
    }
  });

  const passwordCorrect = credentials.password === 'password';

  if(!(user && passwordCorrect)) {
    return response.status(401).json({error:'invalid credentials'});
  }

  const tokenUser = {
    username: user.username,
    id: user.id
  };

  const token = webtoken.sign(tokenUser, SECRET);

  console.log(user.id);

  response.status(200).send({ token, username: user.username, name: user.name });

});

module.exports = router;