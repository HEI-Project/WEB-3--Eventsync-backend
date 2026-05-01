import { Speaker } from '../../models/index.js';

const sanitizeSpeakerInput = (input) => {
  const payload = {};
  if (Object.prototype.hasOwnProperty.call(input, 'fullName')) payload.fullName = input.fullName;
  if (Object.prototype.hasOwnProperty.call(input, 'photoUrl')) payload.photoUrl = input.photoUrl;
  if (Object.prototype.hasOwnProperty.call(input, 'bio')) payload.bio = input.bio;
  if (Object.prototype.hasOwnProperty.call(input, 'externalLinks')) payload.externalLinks = input.externalLinks;
  return payload;
};

const createSpeaker = async (req, res) => {
  const payload = sanitizeSpeakerInput(req.body);
  const speaker = await Speaker.create(payload);
  res.status(201).json(speaker);
};

const updateSpeaker = async (req, res) => {
  const speaker = await Speaker.findByPk(req.params.id);
  if (!speaker) return res.status(404).json({ error: 'Intervenant non trouvé' });
  const payload = sanitizeSpeakerInput(req.body);
  await speaker.update(payload);
  res.json(speaker);
};

const deleteSpeaker = async (req, res) => {
  const speaker = await Speaker.findByPk(req.params.id);
  if (!speaker) return res.status(404).json({ error: 'Intervenant non trouvé' });
  await speaker.destroy();
  res.status(204).send();
};

export { createSpeaker, updateSpeaker, deleteSpeaker };
