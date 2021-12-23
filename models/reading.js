const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Reading extends Model {};

Reading.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id'}
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName:'reading'
});

module.exports = Reading;