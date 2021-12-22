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

module.exports = errorHandler;