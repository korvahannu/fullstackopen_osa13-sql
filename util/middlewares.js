
const webtoken = require('jsonwebtoken');
const { SECRET } = require('./config');
const Session = require('../models/session');
const User = require('../models/user');

const tokenExtractor = async (req, res, next) => {

  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = webtoken.verify(authorization.substring(7), SECRET)
      console.log('validating token');

      const validated = await validateSession(authorization.substring(7));

      if(!validated) {
        console.log('token was  invalid');
        req.decodedToken = "null";
        return res.status(401).json({error: 'session seems to be invalid'});
      }
    }
    catch (error) {
      return res.status(401).json({ error: 'token invalid', message: error.message })
    } 
  }
  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()

};

/*
  Periaatteessa koko session validointi tulee tähän alle
  Onkohan järkevämpää tapaa?
*/
const validateSession = async (token) => {
  console.log('searching for session');
  console.log(token);
  const session = await Session.findOne({where: { token: token }})

  if(!session)
    return false;
  
  console.log('searching for user');
  const user = await User.findOne({where: { id: session.userId }});

  if(!user || user.disabled) {
    await session.destroy();
    return false;
  }
    
  console.log('successfully validated');
  return true;
};

const errorHandler = ( error, request, response, next ) => {
  console.log(error.message);

  console.log(error.name);

  switch(error.name) {

    case "SequelizeValidationError":
      return response.status(400).send({ error: 'Missing required fields or fields dont match criteria', message: error.message });

    case "SequelizeDatabaseError":
      return response.status(400).send({ error: 'Malformatted PUT or POST command' });

    case "SyntaxError":
      return response.status(400).send({ error: 'Syntax error on request' });

    default:
      return response.status(400).send({ error: 'unknown error name' });
  }

  next(error);
};

module.exports = {
  errorHandler,
  tokenExtractor
}