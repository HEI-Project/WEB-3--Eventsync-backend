import jwt from 'jsonwebtoken';
import { User } from '../../models/index.js';

const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email et mot de passe requis' });
  const existing = await User.findOne({ where: { email } });
  if (existing) return res.status(400).json({ error: 'Cet email est déjà utilisé' });
  const user = await User.create({ email, password });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }
  const user = await User.findOne({ where: { email } });
  if (!user || !(await user.validatePassword(password))) return res.status(401).json({ error: 'Identifiants invalides' });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
};

export { register, login };
