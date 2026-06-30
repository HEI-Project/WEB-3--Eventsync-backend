import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import 'express-async-errors';
import { sequelize } from './config/database.js';

// Import des routes publiques et admin
import publicEventRoutes from './routes/public/events.js';
import publicSessionRoutes from './routes/public/sessions.js';
import publicSpeakerRoutes from './routes/public/speakers.js';
import publicRoomRoutes from './routes/public/rooms.js';
import adminAuthRoutes from './routes/admin/auth.js';
import adminEventRoutes from './routes/admin/events.js';
import adminSessionRoutes from './routes/admin/sessions.js';
import adminRoomRoutes from './routes/admin/rooms.js';
import adminSpeakerRoutes from './routes/admin/speakers.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);

// Sécurité
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 2000 }));

app.get('/ping', (req, res) => {
  res.send('pong')
});

// Routes publiques
app.use('/api/events', publicEventRoutes);
app.use('/api/sessions', publicSessionRoutes);
app.use('/api/speakers', publicSpeakerRoutes);
app.use('/api/rooms', publicRoomRoutes);

// Routes admin (authentification requise)
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/events', adminEventRoutes);
app.use('/api/admin/sessions', adminSessionRoutes);
app.use('/api/admin/rooms', adminRoomRoutes);
app.use('/api/admin/speakers', adminSpeakerRoutes);

// Health check
app.get('/api/health', (req, res) => res.status(200).json({ status: 'OK' }));

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.message, '\n', err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

// Démarrage
sequelize.authenticate()
  .then(() => {
    console.log('Connexion PostgreSQL établie');
    app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
  })
  .catch(err => console.error('Erreur de connexion à la BDD :', err));

export default app;
