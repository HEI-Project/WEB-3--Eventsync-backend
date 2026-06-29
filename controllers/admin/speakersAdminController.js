import { Speaker, Session } from '../../models/index.js';
import { paginate, paginatedResponse } from '../../utils/pagination.js';

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

const listSpeakers = async (req, res) => {
  const { offset, limit, page, pageSize } = paginate(req.query);
  const { rows, count } = await Speaker.findAndCountAll({
    distinct: true,
    include: [{ model: Session, as: 'sessions' }],
    offset,
    limit,
  });
  res.json(paginatedResponse(rows, count, page, pageSize));
};

const getSpeakerById = async (req, res) => {
  const speaker = await Speaker.findByPk(req.params.id, {
    include: [{ model: Session, as: 'sessions', include: ['room'] }]
  });
  if (!speaker) return res.status(404).json({ error: 'Intervenant non trouvé' });
  res.json(speaker);
};

export { createSpeaker, updateSpeaker, deleteSpeaker, listSpeakers, getSpeakerById };
