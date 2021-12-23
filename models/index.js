const Blog = require('./blog');
const User = require('./user');
const Reading = require('./reading');
const Readingconnection = require('./readingconnection');
const Session = require('./session');

User.hasMany(Blog);
Blog.belongsTo(User);


Blog.belongsToMany(Reading, { through: Readingconnection });
Reading.belongsToMany(Blog, { through: Readingconnection })

User.hasMany(Reading);

Session.belongsTo(User);

module.exports = {
  Blog,
  User,
  Reading,
  Readingconnection,
  Session
}