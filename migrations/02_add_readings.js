const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('readings', {
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id'}
      }
    });

    await queryInterface.createTable('readingconnections', {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key:'id'},
      },
      reading_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'readings', key:'id' },
      },
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('readinglist');
    await queryInterface.dropTable('readinglistconnections');
  },
};