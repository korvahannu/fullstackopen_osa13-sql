const Blog = require('./blog');
const User = require('./user');
const Reading = require('./reading');
const Readingconnection = require('./readingconnection');

User.hasMany(Blog);
Blog.belongsTo(User);


Blog.belongsToMany(Reading, { through: Readingconnection });
Reading.belongsToMany(Blog, { through: Readingconnection })

User.hasMany(Reading);

module.exports = {
  Blog,
  User,
  Reading,
  Readingconnection
}