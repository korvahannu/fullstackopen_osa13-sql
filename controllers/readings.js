const router = require('express').Router();
const Reading = require('../models/reading');
const ReadingConnection = require('../models/readingconnection');

const { tokenExtractor } = require('../util/middlewares');

router.get('/', async (request, response) => {
  const result = await Reading.findAll();

  response.send(result);
});

router.post('/', async (request, response) => {
  const readingName = request.body.readingName;
  const blogId = request.body.blog_id;
  const userId = request.body.user_id;

  const reading = await Reading.findOne({where:{userId: userId, name:readingName}});

  if(reading) { // Käyttäjällä on olemassa oleva lukulista määritetyllä nimellä
    console.log("Found existing readinglist for user!");

    const newConnection = {
      blogId: blogId,
      readingId: reading.id,
    }

    const result = await ReadingConnection.create(newConnection)

    response.status(204).json(result);
  }
  else {
    console.log("Creating a new readinglist for user...");

    const newReading = await Reading.create({name: readingName, userId: userId});

    const newConnection = {
      blogId: blogId,
      readingId: newReading.id
    }

    const result = await ReadingConnection.create(newConnection);

    response.status(204).json(result);
  }
});

/*
  { parametrinä blogin id
    read: true tai false
    readingName: lukulistan nimi
  }
  eli bodyyn tulee uusi readin tila ja lukulistan nimi
  parametriin tulee blogin id

  aika monimutkaista? ihan hävettää tämä koodi
*/
router.put('/:id', tokenExtractor, async (request, response, next) => {

  const userId = request.decodedToken.id;
  const blogId = request.params.id;
  const read = request.body.read || false;
  const readingName = request.body.readingName;

  try {
    const reading = await Reading.findOne({ where: {
      userId: userId,
      name: readingName
    }});
  
    const readingConnection = await ReadingConnection.findOne({
      where: {
        blogId: blogId,
        readingId: reading.id
      }
    });
  
    readingConnection.read = read;
    const result = await readingConnection.save();
  
    response.send(result);
  }
  catch(error) {
    next(error);
  }

});

module.exports = router;