'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('sessions', [
      {
        id: 'b0000000-0000-0000-0000-000000000001',
        title: 'Architectures Cloud Scalables : Retours d\'Expérience',
        description: 'Découvrez comment concevoir des architectures cloud résilientes et scalables, avec des retours d\'expérience concrets de projets à forte croissance.',
        startTime: new Date('2026-09-15T09:00:00.000Z'),
        endTime: new Date('2026-09-15T10:30:00.000Z'),
        capacity: 200,
        eventId: 'e0000000-0000-0000-0000-000000000001',
        roomId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b0000000-0000-0000-0000-000000000002',
        title: 'L\'IA au Service du Développeur',
        description: 'Comment l\'intelligence artificielle transforme le quotidien des développeurs. Du pair programming avec GitHub Copilot à l\'automatisation des tests.',
        startTime: new Date('2026-09-15T11:00:00.000Z'),
        endTime: new Date('2026-09-15T12:30:00.000Z'),
        capacity: 250,
        eventId: 'e0000000-0000-0000-0000-000000000001',
        roomId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b0000000-0000-0000-0000-000000000003',
        title: 'Design Systems : De la Théorie à la Pratique',
        description: 'Atelier pratique sur la création et la maintenance d\'un design system. De l\'audit initial à l\'implémentation avec Tailwind CSS et Radix UI.',
        startTime: new Date('2026-09-15T14:00:00.000Z'),
        endTime: new Date('2026-09-15T16:00:00.000Z'),
        capacity: 100,
        eventId: 'e0000000-0000-0000-0000-000000000001',
        roomId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b0000000-0000-0000-0000-000000000004',
        title: 'Kubernetes en Production : Pièges à Éviter',
        description: 'Retour d\'expérience sur 3 ans d\'exploitation Kubernetes. Les erreurs courantes, les bonnes pratiques, et les outils essentiels pour la résilience.',
        startTime: new Date('2026-09-16T09:00:00.000Z'),
        endTime: new Date('2026-09-16T10:30:00.000Z'),
        capacity: 150,
        eventId: 'e0000000-0000-0000-0000-000000000001',
        roomId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b0000000-0000-0000-0000-000000000005',
        title: 'Lancer son SaaS : De l\'Idée au Scale',
        description: 'Les coulisses de la création d\'un SaaS. Du choix de la stack technique aux stratégies d\'acquisition, en passant par les erreurs qui ont coûté cher.',
        startTime: new Date('2026-09-16T11:00:00.000Z'),
        endTime: new Date('2026-09-16T12:30:00.000Z'),
        capacity: 180,
        eventId: 'e0000000-0000-0000-0000-000000000001',
        roomId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b0000000-0000-0000-0000-000000000006',
        title: 'Accessibilité Numérique : Rendre le Web Inclusive',
        description: 'Les bases de l\'accessibilité web (WCAG 2.2), les outils d\'audit automatisés, et comment intégrer l\'accessibilité dans votre workflow quotidien.',
        startTime: new Date('2026-11-05T09:30:00.000Z'),
        endTime: new Date('2026-11-05T11:00:00.000Z'),
        capacity: 120,
        eventId: 'e0000000-0000-0000-0000-000000000002',
        roomId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('sessions', null);
  }
};
