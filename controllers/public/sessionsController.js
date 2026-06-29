import { Session, Room, Speaker, Question } from '../../models/index.js';

const getAllSessions = async (req, res) => {
  const sessions = await Session.findAll({
    include: ['room', { model: Speaker, as: 'speakers' }],
    order: [['startTime', 'ASC']]
  });
  res.json(sessions);
};

const getSessionById = async (req, res) => {
  const session = await Session.findByPk(req.params.id, {
    include: ['room', { model: Speaker, as: 'speakers' }]
  });
  if (!session) return res.status(404).json({ error: 'Session non trouvée' });
  const data = session.toJSON();
  const now = new Date();
  data.isLive = now >= new Date(session.startTime) && now <= new Date(session.endTime);
  res.json(data);
};

const getSessionQuestions = async (req, res) => {
  const session = await Session.findByPk(req.params.id);
  if (!session) return res.status(404).json({ error: 'Session non trouvée' });
  const now = new Date();
  if (now < session.startTime) {
    return res.status(403).json({ error: 'Les questions seront disponibles au début de la session' });
  }
  const questions = await Question.findAll({
    where: { sessionId: req.params.id },
    order: [['upvoteCount', 'DESC'], ['createdAt', 'ASC']]
  });
  res.json(questions);
};

const submitQuestion = async (req, res) => {
  const session = await Session.findByPk(req.params.id);
  if (!session) return res.status(404).json({ error: 'Session non trouvée' });
  const now = new Date();
  if (now < session.startTime || now > session.endTime) {
    return res.status(403).json({ error: 'Impossible de poser une question en dehors de la plage horaire de la session' });
  }
  const { content, authorName } = req.body;
  if (!content) return res.status(400).json({ error: 'Le contenu de la question est requis' });
  const question = await Question.create({
    content,
    authorName: authorName || 'Anonyme',
    sessionId: req.params.id
  });
  res.status(201).json(question);
};

const upvoteRegistry = new Set();

const upvoteQuestion = async (req, res) => {
  const question = await Question.findByPk(req.params.questionId);
  if (!question) return res.status(404).json({ error: 'Question non trouvée' });

  const key = `${req.params.questionId}:${req.ip}`;
  if (upvoteRegistry.has(key)) {
    return res.status(429).json({ error: 'Vous avez déjà voté pour cette question' });
  }

  question.upvoteCount += 1;
  await question.save();
  upvoteRegistry.add(key);
  res.json({ upvoteCount: question.upvoteCount });
};

export { getAllSessions, getSessionById, getSessionQuestions, submitQuestion, upvoteQuestion };
