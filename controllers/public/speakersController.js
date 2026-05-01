import { Speaker, Session, Room } from '../../models/index.js';

const getSpeakerById = async (req, res) => {
  const speaker = await Speaker.findByPk(req.params.id, {
    include: [{ model: Session, as: 'sessions', include: ['room'] }]
  });
  if (!speaker) return res.status(404).json({ error: 'Intervenant non trouvé' });
  res.json(speaker);
};

const getAllSpeakers = async (req, res) => {
  const speakers = await Speaker.findAll();
  res.json(speakers);
};

export { getSpeakerById, getAllSpeakers };
