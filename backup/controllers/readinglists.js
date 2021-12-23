const router = require('express').Router();

router.get('/', async (request, response, next) => {
  response.send("hello world");
});

module.exports = router;