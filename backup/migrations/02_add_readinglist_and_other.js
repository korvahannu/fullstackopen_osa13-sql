const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    console.log('adding reading list');
    await queryInterface.createTable('readinglists', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      }
    });

    console.log('adding reading list connections');
    await queryInterface.createTable('readinglistconnections', {

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
      readinglist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'readinglists', key:'id' },
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