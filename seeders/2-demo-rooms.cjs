'use strict';

module.exports = {
  up: async (queryInterface) => {
    const existing = await queryInterface.sequelize.query(
      "SELECT COUNT(*) as count FROM rooms",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (existing[0].count === 0) {
      await queryInterface.bulkInsert('rooms', [{
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        name: 'Salle Principale',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        name: 'Salle B',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    }
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('rooms', null);
  }
};