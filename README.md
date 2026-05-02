# EventSync Backend

## Installation
1. `npm install`
2. Créer la base PostgreSQL : `eventsync_db`
3. Copier `.env.example` en `.env` et modifier
4. `npm run db:migrate`
5. `npm run db:seed`
6. `npm run dev`

## Utilisation
- Admin par défaut : admin@eventsync.com / admin123

## Fonctionnalités
- Gestion complète des événements, sessions, salles, intervenants
- Questions / réponses avec upvotes (uniquement pendant les sessions live)
- Détection automatique des sessions en cours
- Pages publiques pour les intervenants
