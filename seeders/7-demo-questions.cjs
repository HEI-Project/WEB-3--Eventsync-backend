'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('questions', [
      {
        id: 'c0000000-0000-0000-0000-000000000001',
        content: 'Quelle stratégie recommandez-vous pour gérer les pics de trafic imprévisibles sur AWS ?',
        authorName: 'Alexandre',
        upvoteCount: 12,
        sessionId: 'b0000000-0000-0000-0000-000000000001',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'c0000000-0000-0000-0000-000000000002',
        content: 'Avez-vous des retours sur l\'utilisation de Claude vs Copilot pour le développement ?',
        authorName: 'Marie',
        upvoteCount: 8,
        sessionId: 'b0000000-0000-0000-0000-000000000002',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'c0000000-0000-0000-0000-000000000003',
        content: 'Comment gérez-vous la cohérence entre le design system et les composants existants lors d\'une migration ?',
        authorName: 'Julien',
        upvoteCount: 15,
        sessionId: 'b0000000-0000-0000-0000-000000000003',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'c0000000-0000-0000-0000-000000000004',
        content: 'Quel outil de monitoring recommandez-vous pour un cluster Kubernetes multi-cloud ?',
        authorName: 'Anonyme',
        upvoteCount: 6,
        sessionId: 'b0000000-0000-0000-0000-000000000004',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'c0000000-0000-0000-0000-000000000005',
        content: 'À partir de combien d\'utilisateurs est-il temps de passer d\'une architecture monolithe à des microservices ?',
        authorName: 'Sophie',
        upvoteCount: 20,
        sessionId: 'b0000000-0000-0000-0000-000000000005',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('questions', null);
  }
};
