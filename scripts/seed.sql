-- ============================================================
-- EventSync - Données de démonstration
-- ============================================================

-- 1. Rooms
INSERT INTO rooms (id, name, "createdAt", "updatedAt") VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Salle Principale', NOW(), NOW()),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Salle B', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 2. Events
INSERT INTO events (id, title, description, "startDate", "endDate", location, "createdAt", "updatedAt") VALUES
  (
    'e0000000-0000-0000-0000-000000000001',
    'Conférence Tech 2026',
    'Le plus grand rassemblement de développeurs et d''innovateurs en France. Au programme : conférences, ateliers pratiques, et networking.',
    '2026-09-15T08:00:00.000Z',
    '2026-09-17T18:00:00.000Z',
    'Paris, Palais des Congrès',
    NOW(), NOW()
  ),
  (
    'e0000000-0000-0000-0000-000000000002',
    'Design & UX Summit',
    'Une immersion de deux jours dans les dernières tendances du design d''interface, de l''expérience utilisateur et de la recherche utilisateur.',
    '2026-11-05T09:00:00.000Z',
    '2026-11-06T17:00:00.000Z',
    'Lyon, Centre des Congrès',
    NOW(), NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- 3. Speakers
INSERT INTO speakers (id, "fullName", "photoUrl", bio, "externalLinks", "createdAt", "updatedAt") VALUES
  (
    'a0000000-0000-0000-0000-000000000001',
    'Sophie Martin',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    'CTO chez TechFlow, experte en architecture cloud et systèmes distribués.',
    '[{"type":"twitter","url":"https://twitter.com/sophiemartin"}]',
    NOW(), NOW()
  ),
  (
    'a0000000-0000-0000-0000-000000000002',
    'Thomas Dubois',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    'Lead Engineer chez DataPulse, spécialiste en IA et machine learning.',
    '[{"type":"github","url":"https://github.com/thomasdubois"}]',
    NOW(), NOW()
  ),
  (
    'a0000000-0000-0000-0000-000000000003',
    'Léa Moreau',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    'Design Director chez PixelPerfect, spécialiste en design systems et accessibilité.',
    '[{"type":"linkedin","url":"https://linkedin.com/in/leamoreau"}]',
    NOW(), NOW()
  ),
  (
    'a0000000-0000-0000-0000-000000000004',
    'Romain Petit',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    'DevOps Engineer chez Scalïo, expert Kubernetes et observabilité.',
    '[{"type":"github","url":"https://github.com/romainpetit"}]',
    NOW(), NOW()
  ),
  (
    'a0000000-0000-0000-0000-000000000005',
    'Camille Bernard',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    'Full-stack Developer et Entrepreneur. Fondateur de WebForge.',
    '[{"type":"twitter","url":"https://twitter.com/camillebernard"}]',
    NOW(), NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- 4. Sessions
INSERT INTO sessions (id, title, description, "startTime", "endTime", capacity, "eventId", "roomId", "createdAt", "updatedAt") VALUES
  (
    'b0000000-0000-0000-0000-000000000001',
    'Architectures Cloud Scalables',
    'Concevoir des architectures cloud résilientes avec des retours d''expérience concrets.',
    '2026-09-15T09:00:00.000Z',
    '2026-09-15T10:30:00.000Z', 200,
    'e0000000-0000-0000-0000-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    NOW(), NOW()
  ),
  (
    'b0000000-0000-0000-0000-000000000002',
    'L''IA au Service du Développeur',
    'Comment l''IA transforme le quotidien des développeurs : Copilot, automatisation, tests.',
    '2026-09-15T11:00:00.000Z',
    '2026-09-15T12:30:00.000Z', 250,
    'e0000000-0000-0000-0000-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    NOW(), NOW()
  ),
  (
    'b0000000-0000-0000-0000-000000000003',
    'Design Systems : De la Théorie à la Pratique',
    'Atelier pratique sur la création d''un design system avec Tailwind CSS et Radix UI.',
    '2026-09-15T14:00:00.000Z',
    '2026-09-15T16:00:00.000Z', 100,
    'e0000000-0000-0000-0000-000000000001',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    NOW(), NOW()
  ),
  (
    'b0000000-0000-0000-0000-000000000004',
    'Kubernetes en Production',
    '3 ans d''exploitation Kubernetes : erreurs courantes et bonnes pratiques.',
    '2026-09-16T09:00:00.000Z',
    '2026-09-16T10:30:00.000Z', 150,
    'e0000000-0000-0000-0000-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    NOW(), NOW()
  ),
  (
    'b0000000-0000-0000-0000-000000000005',
    'Lancer son SaaS : De l''Idée au Scale',
    'Les coulisses d''un SaaS : stack technique, acquisition, erreurs à éviter.',
    '2026-09-16T11:00:00.000Z',
    '2026-09-16T12:30:00.000Z', 180,
    'e0000000-0000-0000-0000-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    NOW(), NOW()
  ),
  (
    'b0000000-0000-0000-0000-000000000006',
    'Accessibilité Numérique',
    'Rendre le web inclusif : WCAG 2.2, outils d''audit, workflow accessible.',
    '2026-11-05T09:30:00.000Z',
    '2026-11-05T11:00:00.000Z', 120,
    'e0000000-0000-0000-0000-000000000002',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    NOW(), NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- 5. SessionSpeakers
INSERT INTO "SessionSpeakers" ("sessionId", "speakerId", "createdAt", "updatedAt") VALUES
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', NOW(), NOW()),
  ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', NOW(), NOW()),
  ('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000004', NOW(), NOW()),
  ('b0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000005', NOW(), NOW()),
  ('b0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000003', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- 6. Questions
INSERT INTO questions (id, content, "authorName", "upvoteCount", "sessionId", "createdAt", "updatedAt") VALUES
  (
    'c0000000-0000-0000-0000-000000000001',
    'Quelle stratégie pour gérer les pics de trafic imprévisibles sur AWS ?',
    'Alexandre', 12,
    'b0000000-0000-0000-0000-000000000001',
    NOW(), NOW()
  ),
  (
    'c0000000-0000-0000-0000-000000000002',
    'Avez-vous des retours sur Claude vs Copilot pour le développement ?',
    'Marie', 8,
    'b0000000-0000-0000-0000-000000000002',
    NOW(), NOW()
  ),
  (
    'c0000000-0000-0000-0000-000000000003',
    'Comment assurer la cohérence pendant une migration de design system ?',
    'Julien', 15,
    'b0000000-0000-0000-0000-000000000003',
    NOW(), NOW()
  ),
  (
    'c0000000-0000-0000-0000-000000000004',
    'Quel outil de monitoring pour un cluster Kubernetes multi-cloud ?',
    'Anonyme', 6,
    'b0000000-0000-0000-0000-000000000004',
    NOW(), NOW()
  ),
  (
    'c0000000-0000-0000-0000-000000000005',
    'À partir de combien d''utilisateurs passer aux microservices ?',
    'Sophie', 20,
    'b0000000-0000-0000-0000-000000000005',
    NOW(), NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- 7. Admin user (mot de passe: admin123)
-- Le hash bcrypt ci-dessous correspond à "admin123"
INSERT INTO users (id, email, password, role, "createdAt", "updatedAt") VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'admin@eventsync.com',
    '$2a$10$25t5KRb/65tcb7utVXfpqOdx/zpLxpoGUyQ6NW3eQW7zjbGNZCPBy',
    'admin',
    NOW(), NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- Résumé
SELECT '✅ Données de démonstration insérées avec succès !' AS result;
