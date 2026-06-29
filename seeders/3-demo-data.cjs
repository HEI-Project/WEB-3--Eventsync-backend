'use strict';

const EVENT_ID = 'e0000000-0000-0000-0000-000000000001';
const SPEAKER_1_ID = 'a1000000-0000-0000-0000-000000000001';
const SPEAKER_2_ID = 'a2000000-0000-0000-0000-000000000002';
const SPEAKER_3_ID = 'a3000000-0000-0000-0000-000000000003';
const SPEAKER_4_ID = 'a4000000-0000-0000-0000-000000000004';

const ROOM_A_ID = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
const ROOM_B_ID = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

const makeDate = (dateStr) => new Date(dateStr + 'T00:00:00.000Z');
const makeTime = (dateStr, time) => new Date(dateStr + 'T' + time + ':00.000Z');

module.exports = {
  up: async (queryInterface) => {
    // 1. Event
    await queryInterface.bulkInsert('events', [{
      id: EVENT_ID,
      title: 'Conférence Tech 2026',
      description: 'Une journée complète dédiée aux technologies modernes : intelligence artificielle, développement web, DevOps et sécurité. Rejoignez des experts du secteur pour des sessions passionnantes et des ateliers pratiques.',
      startDate: makeDate('2026-06-28'),
      endDate: makeDate('2026-06-29'),
      location: 'Centre de Conférences International, Paris',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    // 2. Speakers
    await queryInterface.bulkInsert('speakers', [
      {
        id: SPEAKER_1_ID,
        fullName: 'Sophia Martin',
        photoUrl: null,
        bio: 'Experte en intelligence artificielle et machine learning avec plus de 10 ans d\'expérience dans la recherche et le développement. Docteure en informatique de l\'Université de Paris-Saclay.',
        externalLinks: JSON.stringify(['https://twitter.com/sophiamartin', 'https://linkedin.com/in/sophiamartin']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: SPEAKER_2_ID,
        fullName: 'Thomas Dubois',
        photoUrl: null,
        bio: 'Architecte web spécialisé en React, Next.js et TypeScript. Lead développeur chez une startup française et contributeur open source passionné.',
        externalLinks: JSON.stringify(['https://twitter.com/thomasdubois', 'https://github.com/thomasdubois']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: SPEAKER_3_ID,
        fullName: 'Emma Petit',
        photoUrl: null,
        bio: 'Ingénieure DevOps chez un leader du cloud computing. Experte en CI/CD, Kubernetes et infrastructure as code. Formatrice et mentor pour les femmes dans la tech.',
        externalLinks: JSON.stringify(['https://linkedin.com/in/emmapetit']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: SPEAKER_4_ID,
        fullName: 'Lucas Bernard',
        photoUrl: null,
        bio: 'Consultant en cybersécurité et ancien pentester. Spécialiste en sécurité des applications web et des infrastructures cloud. Auteur de plusieurs publications sur la sécurité offensive.',
        externalLinks: JSON.stringify(['https://twitter.com/lucasbernard', 'https://github.com/lucasbernard']),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // 3. Sessions (Day 1 - June 28)
    const sessions = [
      {
        id: 'b0000001-0000-0000-0000-000000000001',
        title: 'Keynote : L\'avenir de la Tech',
        description: 'Une présentation des grandes tendances technologiques qui façonneront les prochaines années : IA générative, edge computing, et souveraineté numérique.',
        startTime: makeTime('2026-06-28', '09:00'),
        endTime: makeTime('2026-06-28', '10:30'),
        capacity: 200,
        eventId: EVENT_ID,
        roomId: ROOM_A_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b0000002-0000-0000-0000-000000000002',
        title: 'Développement Web Moderne avec Next.js',
        description: 'Atelier pratique sur la création d\'applications web performantes avec Next.js 16, React Server Components et les nouvelles APIs du framework.',
        startTime: makeTime('2026-06-28', '11:00'),
        endTime: makeTime('2026-06-28', '12:30'),
        capacity: 80,
        eventId: EVENT_ID,
        roomId: ROOM_B_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b0000003-0000-0000-0000-000000000003',
        title: 'Introduction au Machine Learning',
        description: 'Découvrez les fondamentaux du machine learning : algorithms de classification, régression et réseaux de neurones. Démonstration en direct avec Python et TensorFlow.',
        startTime: makeTime('2026-06-28', '14:00'),
        endTime: makeTime('2026-06-28', '15:30'),
        capacity: 100,
        eventId: EVENT_ID,
        roomId: ROOM_A_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b0000004-0000-0000-0000-000000000004',
        title: 'Sécurité des Applications Web',
        description: 'Les bonnes pratiques pour sécuriser vos applications web : XSS, CSRF, injection SQL, authentification et gestion des sessions. Retour d\'expérience sur des cas réels.',
        startTime: makeTime('2026-06-28', '16:00'),
        endTime: makeTime('2026-06-28', '17:30'),
        capacity: 60,
        eventId: EVENT_ID,
        roomId: ROOM_B_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Sessions Day 2 (June 29)
      {
        id: 'b0000005-0000-0000-0000-000000000005',
        title: 'Cloud Native : Kubernetes et Docker',
        description: 'Comment déployer et orchestrer vos applications avec Kubernetes. De la conteneurisation à la mise en production, en passant par le monitoring et le scaling automatique.',
        startTime: makeTime('2026-06-29', '09:00'),
        endTime: makeTime('2026-06-29', '10:30'),
        capacity: 120,
        eventId: EVENT_ID,
        roomId: ROOM_A_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b0000006-0000-0000-0000-000000000006',
        title: 'CI/CD et DevOps en Pratique',
        description: 'Mettez en place une pipeline d\'intégration et de déploiement continu complète : GitHub Actions, tests automatisés, déploiement blue-green et rollback.',
        startTime: makeTime('2026-06-29', '11:00'),
        endTime: makeTime('2026-06-29', '12:30'),
        capacity: 75,
        eventId: EVENT_ID,
        roomId: ROOM_B_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b0000007-0000-0000-0000-000000000007',
        title: 'Deep Learning avec PyTorch',
        description: 'Session avancée sur le deep learning : réseaux de neurones convolutifs, transformers et modèles génératifs. Exemples concrets d\'applications en vision et NLP.',
        startTime: makeTime('2026-06-29', '14:00'),
        endTime: makeTime('2026-06-29', '15:30'),
        capacity: 90,
        eventId: EVENT_ID,
        roomId: ROOM_A_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b0000008-0000-0000-0000-000000000008',
        title: 'Table Ronde : La Tech en 2026',
        description: 'Discussion interactive entre tous les intervenants sur les défis et opportunités de la tech en 2026 : éthique de l\'IA, impact environnemental et souveraineté numérique.',
        startTime: makeTime('2026-06-29', '16:00'),
        endTime: makeTime('2026-06-29', '17:30'),
        capacity: 200,
        eventId: EVENT_ID,
        roomId: ROOM_B_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('sessions', sessions);

    // 4. Session-Speaker associations
    await queryInterface.bulkInsert('SessionSpeakers', [
      // Day 1
      { SessionId: sessions[0].id, SpeakerId: SPEAKER_1_ID, createdAt: new Date(), updatedAt: new Date() },
      { SessionId: sessions[0].id, SpeakerId: SPEAKER_2_ID, createdAt: new Date(), updatedAt: new Date() },
      { SessionId: sessions[1].id, SpeakerId: SPEAKER_2_ID, createdAt: new Date(), updatedAt: new Date() },
      { SessionId: sessions[2].id, SpeakerId: SPEAKER_1_ID, createdAt: new Date(), updatedAt: new Date() },
      { SessionId: sessions[3].id, SpeakerId: SPEAKER_4_ID, createdAt: new Date(), updatedAt: new Date() },
      // Day 2
      { SessionId: sessions[4].id, SpeakerId: SPEAKER_3_ID, createdAt: new Date(), updatedAt: new Date() },
      { SessionId: sessions[5].id, SpeakerId: SPEAKER_3_ID, createdAt: new Date(), updatedAt: new Date() },
      { SessionId: sessions[5].id, SpeakerId: SPEAKER_2_ID, createdAt: new Date(), updatedAt: new Date() },
      { SessionId: sessions[6].id, SpeakerId: SPEAKER_1_ID, createdAt: new Date(), updatedAt: new Date() },
      { SessionId: sessions[7].id, SpeakerId: SPEAKER_1_ID, createdAt: new Date(), updatedAt: new Date() },
      { SessionId: sessions[7].id, SpeakerId: SPEAKER_2_ID, createdAt: new Date(), updatedAt: new Date() },
      { SessionId: sessions[7].id, SpeakerId: SPEAKER_3_ID, createdAt: new Date(), updatedAt: new Date() },
      { SessionId: sessions[7].id, SpeakerId: SPEAKER_4_ID, createdAt: new Date(), updatedAt: new Date() }
    ]);

    // 5. Questions
    await queryInterface.bulkInsert('questions', [
      {
        id: 'c0000001-0000-0000-0000-000000000001',
        content: 'Quel est l\'impact du edge computing sur la souveraineté numérique ?',
        authorName: 'Marie L.',
        upvoteCount: 12,
        sessionId: sessions[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'c0000002-0000-0000-0000-000000000002',
        content: 'Est-ce que Next.js remplacera complètement Create React App ?',
        authorName: 'Alex D.',
        upvoteCount: 8,
        sessionId: sessions[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'c0000003-0000-0000-0000-000000000003',
        content: 'Quels sont les prérequis pour se lancer dans le machine learning ?',
        authorName: 'Julie',
        upvoteCount: 15,
        sessionId: sessions[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'c0000004-0000-0000-0000-000000000004',
        content: 'Avez-vous des recommandations d\'outils pour la sécurisation des API REST ?',
        authorName: 'Anonyme',
        upvoteCount: 6,
        sessionId: sessions[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'c0000005-0000-0000-0000-000000000005',
        content: 'Quelle est la différence entre Docker Compose et Kubernetes pour un petit projet ?',
        authorName: 'Pierre M.',
        upvoteCount: 10,
        sessionId: sessions[4].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'c0000006-0000-0000-0000-000000000006',
        content: 'Comment gérer les secrets dans une pipeline CI/CD ?',
        authorName: 'Anonyme',
        upvoteCount: 4,
        sessionId: sessions[5].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('questions', null);
    await queryInterface.bulkDelete('SessionSpeakers', null);
    await queryInterface.bulkDelete('sessions', null);
    await queryInterface.bulkDelete('speakers', null);
    await queryInterface.bulkDelete('events', null);
  }
};
