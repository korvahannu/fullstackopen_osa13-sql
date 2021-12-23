const webtoken = require('jsonwebtoken');
const router = require('express').Router();
const { SECRET } = require('../util/config');
const User = require('../models/user');
const Session = require('../models/session');

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

  if(user.disabled)
    return response.status(401).json({error: 'this account is disabled'});

  const tokenUser = {
    username: user.username,
    id: user.id
  };

  const token = webtoken.sign(tokenUser, SECRET);

  const oldSession = await Session.findOne({where: { userId: user.id}});

  if(oldSession) {
    await oldSession.destroy();
    console.log('deleted old session');
  }

  Session.create({token: token, userId: user.id});

  console.log(user.id);

  response.status(200).send({ token, username: user.username, name: user.name });

});

module.exports = router;