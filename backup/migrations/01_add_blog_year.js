const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    console.log('adding year to blog')
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min:1991,
        max: 2021
      }
    });
    console.log('finished adding year to blog');
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('blogs', 'year');
  },
};