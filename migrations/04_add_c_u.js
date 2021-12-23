const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn('sessions', 'created_at', {
      allowNull: false,
      type: DataTypes.DATE
    });
    await queryInterface.addColumn('sessions', 'updated_at', {
      allowNull: false,
      type: DataTypes.DATE
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('sessions', 'created_at');
    await queryInterface.removeColumn('sessions', 'updated_at');
  },
};