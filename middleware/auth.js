import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token manquant' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    if (!user || user.role !== 'admin')
      return res.status(403).json({ error: 'Accès réservé aux administrateurs' });
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token invalide ou expiré' });
  }
};

export { authenticateAdmin };
