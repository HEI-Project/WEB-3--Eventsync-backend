'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('sessions', 'eventId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: 'events', key: 'id' },
      onDelete: 'CASCADE'
    });
    await queryInterface.changeColumn('sessions', 'roomId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: 'rooms', key: 'id' },
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('sessions', 'eventId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: 'events', key: 'id' },
      onDelete: 'CASCADE'
    });
    await queryInterface.changeColumn('sessions', 'roomId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: 'rooms', key: 'id' },
      onDelete: 'CASCADE'
    });
  }
};
