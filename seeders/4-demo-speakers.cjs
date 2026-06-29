'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('speakers', [
      {
        id: 'a0000000-0000-0000-0000-000000000001',
        fullName: 'Sophie Martin',
        photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        bio: 'CTO chez TechFlow, experte en architecture cloud et systèmes distribués. Speaker international et auteure de "Building Resilient Systems".',
        externalLinks: JSON.stringify([
          { type: 'twitter', url: 'https://twitter.com/sophiemartin' },
          { type: 'linkedin', url: 'https://linkedin.com/in/sophiemartin' }
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'a0000000-0000-0000-0000-000000000002',
        fullName: 'Thomas Dubois',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        bio: 'Lead Engineer chez DataPulse, spécialiste en intelligence artificielle et machine learning. Passionné par l\'éthique des algorithmes.',
        externalLinks: JSON.stringify([
          { type: 'github', url: 'https://github.com/thomasdubois' },
          { type: 'twitter', url: 'https://twitter.com/thomasdubois' }
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'a0000000-0000-0000-0000-000000000003',
        fullName: 'Léa Moreau',
        photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        bio: 'Design Director chez PixelPerfect, spécialiste en design systems et accessibilité numérique. Figma Community Champion.',
        externalLinks: JSON.stringify([
          { type: 'linkedin', url: 'https://linkedin.com/in/leamoreau' },
          { type: 'website', url: 'https://leamoreau.design' }
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'a0000000-0000-0000-0000-000000000004',
        fullName: 'Romain Petit',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        bio: 'DevOps Engineer chez Scalïo, expert Kubernetes et observabilité. Créateur de plusieurs outils open source dans l\'écosystème Cloud Native.',
        externalLinks: JSON.stringify([
          { type: 'github', url: 'https://github.com/romainpetit' },
          { type: 'twitter', url: 'https://twitter.com/romainpetit' }
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'a0000000-0000-0000-0000-000000000005',
        fullName: 'Camille Bernard',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        bio: 'Full-stack Developer et Entrepreneur. Fondateur de WebForge, une plateforme SaaS utilisée par plus de 10 000 entreprises.',
        externalLinks: JSON.stringify([
          { type: 'twitter', url: 'https://twitter.com/camillebernard' },
          { type: 'linkedin', url: 'https://linkedin.com/in/camillebernard' }
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('speakers', null);
  }
};
