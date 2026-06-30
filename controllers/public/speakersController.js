import { Speaker, Session, Room, Question } from '../../models/index.js';

const addLiveStatus = (sessions) => {
  const now = new Date();
  return sessions.map(s => {
    s.isLive = now >= new Date(s.startTime) && now <= new Date(s.endTime);
    return s;
  });
};

const getSpeakerById = async (req, res) => {
  const speaker = await Speaker.findByPk(req.params.id, {
    include: [{ model: Session, as: 'sessions', include: ['room'] }]
  });
  if (!speaker) return res.status(404).json({ error: 'Intervenant non trouvé' });
  const data = speaker.toJSON();
  if (data.sessions) data.sessions = addLiveStatus(data.sessions);
  res.json(data);
};

const getAllSpeakers = async (req, res) => {
  const speakers = await Speaker.findAll({
    include: [{ model: Session, as: 'sessions' }],
    order: [['fullName', 'ASC']]
  });
  res.json(speakers);
};

const getSpeakerSessionQuestions = async (req, res) => {
  const speaker = await Speaker.findByPk(req.params.id, {
    include: [{ model: Session, as: 'sessions' }]
  });
  if (!speaker) return res.status(404).json({ error: 'Intervenant non trouvé' });

  const sessionIds = speaker.sessions.map(s => s.id);
  if (sessionIds.length === 0) return res.json([]);

  const questions = await Question.findAll({
    include: [{ model: Session, as: 'session' }],
    where: { sessionId: sessionIds },
    order: [['upvoteCount', 'DESC'], ['createdAt', 'ASC']]
  });

  res.json(questions);
};

export { getSpeakerById, getAllSpeakers, getSpeakerSessionQuestions };
