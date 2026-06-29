'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('SessionSpeakers', [
      { sessionId: 'b0000000-0000-0000-0000-000000000001', speakerId: 'a0000000-0000-0000-0000-000000000001', createdAt: new Date(), updatedAt: new Date() },
      { sessionId: 'b0000000-0000-0000-0000-000000000002', speakerId: 'a0000000-0000-0000-0000-000000000002', createdAt: new Date(), updatedAt: new Date() },
      { sessionId: 'b0000000-0000-0000-0000-000000000003', speakerId: 'a0000000-0000-0000-0000-000000000003', createdAt: new Date(), updatedAt: new Date() },
      { sessionId: 'b0000000-0000-0000-0000-000000000004', speakerId: 'a0000000-0000-0000-0000-000000000004', createdAt: new Date(), updatedAt: new Date() },
      { sessionId: 'b0000000-0000-0000-0000-000000000005', speakerId: 'a0000000-0000-0000-0000-000000000005', createdAt: new Date(), updatedAt: new Date() },
      { sessionId: 'b0000000-0000-0000-0000-000000000006', speakerId: 'a0000000-0000-0000-0000-000000000003', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('SessionSpeakers', null);
  }
};
