const router = require('express').Router();
const { Blog } = require('../models');

router.get('/', async (request, response) => {
  const blogs = await Blog.findAll();
  response.json(blogs);
});

router.post('/', async (request, response, next) => {
  try {
    console.log('Someone is requiesting to create blog with ' + JSON.stringify(request.body, null, 2));
    const blog = await Blog.create(request.body);
    response.json(blog);
  }
  catch(error) {
    next(error);
  }
});

router.delete('/:id', async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findByPk(id);
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