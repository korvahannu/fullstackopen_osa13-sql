const router = require('express').Router();
const { User, Blog } = require ('../models');
const { sequelize } = require('../models/blog');

router.get('/', async (request, response) => {
  const result = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
      [sequelize.fn('COUNT', sequelize.col('author')), 'blogs']
    ],
    group: ['author']
  });

  response.json(result);
});

module.exports = router;