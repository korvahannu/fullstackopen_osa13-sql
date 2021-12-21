require('dotenv').config();
const express = require('express');
const app = express();
const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');
const blogsRouter = require('./controllers/blogs');
const errorHandler = require('./util/middlewares');

app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use(errorHandler);

const startServer = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
  });
}

startServer();

