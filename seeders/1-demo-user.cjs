'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    const existing = await queryInterface.sequelize.query(
      "SELECT id FROM users WHERE email = 'admin@eventsync.com' LIMIT 1",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (existing.length === 0) {
      const hash = await bcrypt.hash('admin123', 10);
      await queryInterface.bulkInsert('users', [{
        id: '11111111-1111-1111-1111-111111111111',
        email: 'admin@eventsync.com',
        password: hash,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    }
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', { email: 'admin@eventsync.com' });
  }
};