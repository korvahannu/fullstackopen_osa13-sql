const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Readingconnection extends Model {};

Readingconnection.init({
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
  readingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'readings', key:'id' },
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
  modelName:'readingconnection'
});

module.exports = Readingconnection;