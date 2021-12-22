const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {

    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min:1991,
        max: 2021
      }
    });

  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('blogs', 'year');
  },
};