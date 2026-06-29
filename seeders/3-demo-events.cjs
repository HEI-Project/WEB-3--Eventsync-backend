'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('events', [
      {
        id: 'e0000000-0000-0000-0000-000000000001',
        title: 'Conférence Tech 2026',
        description: 'Le plus grand rassemblement de développeurs et d\'innovateurs en France. Au programme : conférences, ateliers pratiques, et networking.',
        startDate: new Date('2026-09-15T08:00:00.000Z'),
        endDate: new Date('2026-09-17T18:00:00.000Z'),
        location: 'Paris, Palais des Congrès',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'e0000000-0000-0000-0000-000000000002',
        title: 'Design & UX Summit',
        description: 'Une immersion de deux jours dans les dernières tendances du design d\'interface, de l\'expérience utilisateur et de la recherche utilisateur.',
        startDate: new Date('2026-11-05T09:00:00.000Z'),
        endDate: new Date('2026-11-06T17:00:00.000Z'),
        location: 'Lyon, Centre des Congrès',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('events', null);
  }
};
