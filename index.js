require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

class Blog extends Model { };

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  likes: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  sequelize,
  underscored:true,
  timestamps:false,
  modelName:'blog'
});

Blog.sync();

app.use(express.json());

app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.findAll();
  response.json(blogs);
});

app.post('/api/blogs', async (request, response) => {
  console.log('Someone is requiesting to create blog with ' + JSON.stringify(request.body, null, 2));
  const blog = await Blog.create(request.body);
  response.json(blog);
});

app.delete('/api/blogs/:id', async (request, response) => {
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

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});