const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Readinglistconnection extends Model {};

Readinglistconnection.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogs', key:'id'},
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key:'id' },
  },
  read: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName:'readinglistconnection'
});

module.exports = Readinglistconnection;