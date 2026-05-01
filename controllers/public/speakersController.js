const { Speaker, Session, Room } = require('../../models');
exports.getSpeakerById = async (req, res) => {
  const speaker = await Speaker.findByPk(req.params.id, {
    include: [{ model: Session, as: 'sessions', include: ['room'] }]
  });
  if (!speaker) return res.status(404).json({ error: 'Intervenant non trouvé' });
  res.json(speaker);
};
exports.getAllSpeakers = async (req, res) => {
  const speakers = await Speaker.findAll();
  res.json(speakers);
};
