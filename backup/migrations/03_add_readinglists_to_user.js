const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {

    await queryInterface.addColumn('readinglists', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id'}
    });

  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('readinglists', 'user_id');
  },
};