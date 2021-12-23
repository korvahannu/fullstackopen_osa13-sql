const router = require('express').Router();
const Session = require('../models/session');
const { tokenExtractor } = require('../util/middlewares');

router.delete('/', tokenExtractor, async (request, response) => {
  
  const id = request.decodedToken.id;

  const session = await Session.findOne({where: { userId: id}});
  await session.destroy();

  response.status(200).end();;

});

module.exports = router;