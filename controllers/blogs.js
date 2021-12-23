const router = require('express').Router();
const { Blog, User } = require('../models');
const { tokenExtractor } = require('../util/middlewares');

const { Op } = require('sequelize');


router.get('/', async (request, response) => {

  let where = {}

  if(request.query.search) {

    where = {
      [Op.or]: [
        {
          title: {
            [Op.substring]: request.query.search
          }
        },
        {
          author: {
            [Op.substring]: request.query.search
          }
        }
      ]
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId']},
    include: [
      {
        model: User,
        attributes: ['name']
      }
    ],
      where,
      order: [['likes', 'DESC']]
  });


  response.json(blogs);
});

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({...req.body, userId: user.id});
    res.json(blog);
  }
  catch(error) {
    next(error);
  }
});

router.delete('/:id', tokenExtractor, async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findByPk(id);

  if(blog.userId !== request.decodedToken.id)
    return response.status(401).send("You are not authorized to do this");

  if(blog) {
    blog.destroy();
    response.status(204).end();
  }
  else {
    response.status(404).end();
  }
});

router.put('/:id', async (request, response, next) => {

  try {
    const id = request.params.id;
    const likes = parseInt(request.body.likes);
    const blog = await Blog.findByPk(id);

    blog.likes = likes;
    await blog.save();
    response.json({
      likes: blog.likes
    });
  }
  catch (error) {
    next(error);
  }
});

module.exports = router;