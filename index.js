require('dotenv').config();
const express = require('express');
const app = express();
const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const readingsRouter = require('./controllers/readings');
const authorsRouter = require('./controllers/authors');
const errorHandler = require('./util/middlewares');

app.use(express.json());
app.use('/api/authors', authorsRouter);
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/readinglist', readingsRouter);
app.use(errorHandler);

const startServer = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
  });
}

startServer();

