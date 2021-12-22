const router = require('express').Router();
const { User, Blog } = require('../models');

router.get('/', async (request, response) => {

  const result = await User.findAll({
    include: {
      model: Blog,
      attributes: ['title', 'author', 'url', 'likes']
    }
  });
  response.json(result);

});

router.post('/', async (request, response, next) => {

  try {
    const user = await User.create(request.body);
    response.json(user);
  }
  catch(error) {
    next(error);
  }

});

router.put('/:username', async (request, response, next) => {
  try {
    const username = request.params.username;
    const user = await User.findOne({ where: { username: username }});
    const name = request.body.name.toString();
    user.name = name;
    await user.save();
    response.json(user);
  }
  catch(error) {
    next(error);
  }
});

module.exports = router;