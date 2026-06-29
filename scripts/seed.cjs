'use strict';

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Connexion directe à PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME || 'eventsync_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false
  }
);

// Définition brute des modèles (identique aux migrations)
const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin'), defaultValue: 'admin' }
}, { tableName: 'users', timestamps: true });

const Event = sequelize.define('Event', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  location: { type: DataTypes.STRING }
}, { tableName: 'events', timestamps: true });

const Room = sequelize.define('Room', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'rooms', timestamps: true });

const Session = sequelize.define('Session', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  startTime: { type: DataTypes.DATE, allowNull: false },
  endTime: { type: DataTypes.DATE, allowNull: false },
  capacity: { type: DataTypes.INTEGER },
  eventId: { type: DataTypes.UUID, allowNull: false },
  roomId: { type: DataTypes.UUID, allowNull: false }
}, { tableName: 'sessions', timestamps: true });

const Speaker = sequelize.define('Speaker', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  fullName: { type: DataTypes.STRING, allowNull: false },
  photoUrl: { type: DataTypes.STRING },
  bio: { type: DataTypes.TEXT },
  externalLinks: { type: DataTypes.JSONB, defaultValue: [] }
}, { tableName: 'speakers', timestamps: true });

const Question = sequelize.define('Question', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  authorName: { type: DataTypes.STRING, defaultValue: 'Anonyme' },
  upvoteCount: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { tableName: 'questions', timestamps: true });

const SessionSpeaker = sequelize.define('SessionSpeaker', {
  sessionId: { type: DataTypes.UUID, allowNull: false },
  speakerId: { type: DataTypes.UUID, allowNull: false }
}, { tableName: 'SessionSpeakers', timestamps: true });

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('✓ Connexion PostgreSQL établie');

    // Crée toutes les tables
    await sequelize.sync({ force: true });
    console.log('✓ Tables créées');

    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash('admin123', 10);

    // 1. Users
    await User.create({
      id: '11111111-1111-1111-1111-111111111111',
      email: 'admin@eventsync.com',
      password: hash,
      role: 'admin'
    });
    console.log('✓ Admin créé (admin@eventsync.com / admin123)');

    // 2. Rooms
    await Room.bulkCreate([
      { id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name: 'Salle Principale' },
      { id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', name: 'Salle B' }
    ]);
    console.log('✓ 2 salles créées');

    // 3. Events
    await Event.bulkCreate([
      {
        id: 'e0000000-0000-0000-0000-000000000001',
        title: 'Conférence Tech 2026',
        description: 'Le plus grand rassemblement de développeurs et d\'innovateurs en France. Au programme : conférences, ateliers pratiques, et networking.',
        startDate: new Date('2026-09-15T08:00:00.000Z'),
        endDate: new Date('2026-09-17T18:00:00.000Z'),
        location: 'Paris, Palais des Congrès'
      },
      {
        id: 'e0000000-0000-0000-0000-000000000002',
        title: 'Design & UX Summit',
        description: 'Une immersion de deux jours dans les dernières tendances du design d\'interface, de l\'expérience utilisateur et de la recherche utilisateur.',
        startDate: new Date('2026-11-05T09:00:00.000Z'),
        endDate: new Date('2026-11-06T17:00:00.000Z'),
        location: 'Lyon, Centre des Congrès'
      }
    ]);
    console.log('✓ 2 événements créés');

    // 4. Speakers
    await Speaker.bulkCreate([
      {
        id: 'a0000000-0000-0000-0000-000000000001',
        fullName: 'Sophie Martin',
        photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        bio: 'CTO chez TechFlow, experte en architecture cloud et systèmes distribués.',
        externalLinks: [{ type: 'twitter', url: 'https://twitter.com/sophiemartin' }]
      },
      {
        id: 'a0000000-0000-0000-0000-000000000002',
        fullName: 'Thomas Dubois',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        bio: 'Lead Engineer chez DataPulse, spécialiste en IA et machine learning.',
        externalLinks: [{ type: 'github', url: 'https://github.com/thomasdubois' }]
      },
      {
        id: 'a0000000-0000-0000-0000-000000000003',
        fullName: 'Léa Moreau',
        photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        bio: 'Design Director chez PixelPerfect, spécialiste en design systems et accessibilité.',
        externalLinks: [{ type: 'linkedin', url: 'https://linkedin.com/in/leamoreau' }]
      },
      {
        id: 'a0000000-0000-0000-0000-000000000004',
        fullName: 'Romain Petit',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        bio: 'DevOps Engineer chez Scalïo, expert Kubernetes et observabilité.',
        externalLinks: [{ type: 'github', url: 'https://github.com/romainpetit' }]
      },
      {
        id: 'a0000000-0000-0000-0000-000000000005',
        fullName: 'Camille Bernard',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        bio: 'Full-stack Developer et Entrepreneur. Fondateur de WebForge.',
        externalLinks: [{ type: 'twitter', url: 'https://twitter.com/camillebernard' }]
      }
    ]);
    console.log('✓ 5 speakers créés');

    // 5. Sessions
    await Session.bulkCreate([
      {
        id: 'b0000000-0000-0000-0000-000000000001',
        title: 'Architectures Cloud Scalables',
        description: 'Concevoir des architectures cloud résilientes avec des retours d\'expérience concrets.',
        startTime: new Date('2026-09-15T09:00:00.000Z'),
        endTime: new Date('2026-09-15T10:30:00.000Z'),
        capacity: 200,
        eventId: 'e0000000-0000-0000-0000-000000000001',
        roomId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
      },
      {
        id: 'b0000000-0000-0000-0000-000000000002',
        title: 'L\'IA au Service du Développeur',
        description: 'Comment l\'IA transforme le quotidien des développeurs : Copilot, automatisation, tests.',
        startTime: new Date('2026-09-15T11:00:00.000Z'),
        endTime: new Date('2026-09-15T12:30:00.000Z'),
        capacity: 250,
        eventId: 'e0000000-0000-0000-0000-000000000001',
        roomId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
      },
      {
        id: 'b0000000-0000-0000-0000-000000000003',
        title: 'Design Systems : De la Théorie à la Pratique',
        description: 'Atelier pratique sur la création d\'un design system avec Tailwind CSS et Radix UI.',
        startTime: new Date('2026-09-15T14:00:00.000Z'),
        endTime: new Date('2026-09-15T16:00:00.000Z'),
        capacity: 100,
        eventId: 'e0000000-0000-0000-0000-000000000001',
        roomId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
      },
      {
        id: 'b0000000-0000-0000-0000-000000000004',
        title: 'Kubernetes en Production',
        description: '3 ans d\'exploitation Kubernetes : erreurs courantes et bonnes pratiques.',
        startTime: new Date('2026-09-16T09:00:00.000Z'),
        endTime: new Date('2026-09-16T10:30:00.000Z'),
        capacity: 150,
        eventId: 'e0000000-0000-0000-0000-000000000001',
        roomId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
      },
      {
        id: 'b0000000-0000-0000-0000-000000000005',
        title: 'Lancer son SaaS : De l\'Idée au Scale',
        description: 'Les coulisses d\'un SaaS : stack technique, acquisition, erreurs à éviter.',
        startTime: new Date('2026-09-16T11:00:00.000Z'),
        endTime: new Date('2026-09-16T12:30:00.000Z'),
        capacity: 180,
        eventId: 'e0000000-0000-0000-0000-000000000001',
        roomId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
      },
      {
        id: 'b0000000-0000-0000-0000-000000000006',
        title: 'Accessibilité Numérique',
        description: 'Rendre le web inclusif : WCAG 2.2, outils d\'audit, workflow accessible.',
        startTime: new Date('2026-11-05T09:30:00.000Z'),
        endTime: new Date('2026-11-05T11:00:00.000Z'),
        capacity: 120,
        eventId: 'e0000000-0000-0000-0000-000000000002',
        roomId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
      }
    ]);
    console.log('✓ 6 sessions créées');

    // 6. SessionSpeakers
    await SessionSpeaker.bulkCreate([
      { sessionId: 'b0000000-0000-0000-0000-000000000001', speakerId: 'a0000000-0000-0000-0000-000000000001' },
      { sessionId: 'b0000000-0000-0000-0000-000000000002', speakerId: 'a0000000-0000-0000-0000-000000000002' },
      { sessionId: 'b0000000-0000-0000-0000-000000000003', speakerId: 'a0000000-0000-0000-0000-000000000003' },
      { sessionId: 'b0000000-0000-0000-0000-000000000004', speakerId: 'a0000000-0000-0000-0000-000000000004' },
      { sessionId: 'b0000000-0000-0000-0000-000000000005', speakerId: 'a0000000-0000-0000-0000-000000000005' },
      { sessionId: 'b0000000-0000-0000-0000-000000000006', speakerId: 'a0000000-0000-0000-0000-000000000003' }
    ]);
    console.log('✓ 6 associations session-speaker créées');

    // 7. Questions
    await Question.bulkCreate([
      {
        content: 'Quelle stratégie pour gérer les pics de trafic imprévisibles sur AWS ?',
        authorName: 'Alexandre',
        upvoteCount: 12,
        sessionId: 'b0000000-0000-0000-0000-000000000001'
      },
      {
        content: 'Avez-vous des retours sur Claude vs Copilot pour le développement ?',
        authorName: 'Marie',
        upvoteCount: 8,
        sessionId: 'b0000000-0000-0000-0000-000000000002'
      },
      {
        content: 'Comment assurer la cohérence pendant une migration de design system ?',
        authorName: 'Julien',
        upvoteCount: 15,
        sessionId: 'b0000000-0000-0000-0000-000000000003'
      },
      {
        content: 'Quel outil de monitoring pour un cluster Kubernetes multi-cloud ?',
        authorName: 'Anonyme',
        upvoteCount: 6,
        sessionId: 'b0000000-0000-0000-0000-000000000004'
      },
      {
        content: 'À partir de combien d\'utilisateurs passer aux microservices ?',
        authorName: 'Sophie',
        upvoteCount: 20,
        sessionId: 'b0000000-0000-0000-0000-000000000005'
      }
    ]);
    console.log('✓ 5 questions créées');

    console.log('\n✅ Base de données seedée avec succès !');
    console.log('   Identifiants admin : admin@eventsync.com / admin123');

  } catch (err) {
    console.error('❌ Erreur :', err);
  } finally {
    await sequelize.close();
  }
}

seed();
