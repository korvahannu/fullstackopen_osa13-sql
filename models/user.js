const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class User extends Model { };

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  username: {
    type:DataTypes.TEXT,
    unique: true,
    allowNull:false,
    validate: {
      isEmail: true
    }
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName:'user'
});

module.exports = User;