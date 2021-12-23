const Blog = require('./blog');
const User = require('./user');
const Readinglistconnection = require('./readinglistconnection');

Blog.belongsToMany(User, { through: Readinglistconnection });
User.belongsToMany(Blog, { through: Readinglistconnection });

module.exports = {
  Blog,
  User,
  Readinglistconnection
}