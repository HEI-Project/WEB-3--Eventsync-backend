import { Session, Speaker } from '../../models/index.js';

const sanitizeSessionInput = (input) => {
  const payload = {};
  if (Object.prototype.hasOwnProperty.call(input, 'title')) payload.title = input.title;
  if (Object.prototype.hasOwnProperty.call(input, 'description')) payload.description = input.description;
  if (Object.prototype.hasOwnProperty.call(input, 'startTime')) payload.startTime = input.startTime;
  if (Object.prototype.hasOwnProperty.call(input, 'endTime')) payload.endTime = input.endTime;
  if (Object.prototype.hasOwnProperty.call(input, 'capacity')) payload.capacity = input.capacity;
  if (Object.prototype.hasOwnProperty.call(input, 'eventId')) payload.eventId = input.eventId;
  if (Object.prototype.hasOwnProperty.call(input, 'roomId')) payload.roomId = input.roomId;
  if (Object.prototype.hasOwnProperty.call(input, 'speakerIds')) payload.speakerIds = input.speakerIds;
  return payload;
};

const createSession = async (req, res) => {
  const payload = sanitizeSessionInput(req.body);
  if (!payload.speakerIds || payload.speakerIds.length === 0) {
    return res.status(400).json({ error: 'Au moins un intervenant est requis' });
  }
  if (!payload.eventId) {
    return res.status(400).json({ error: "L'identifiant de l'événement est requis" });
  }
  if (!payload.roomId) {
    return res.status(400).json({ error: "L'identifiant de la salle est requis" });
  }
  const session = await Session.create(payload);
  await session.addSpeakers(payload.speakerIds);
  res.status(201).json(session);
};

const updateSession = async (req, res) => {
  const session = await Session.findByPk(req.params.id);
  if (!session) return res.status(404).json({ error: 'Session non trouvée' });
  const payload = sanitizeSessionInput(req.body);
  await session.update(payload);
  if (payload.speakerIds) await session.setSpeakers(payload.speakerIds);
  res.json(session);
};

const deleteSession = async (req, res) => {
  const session = await Session.findByPk(req.params.id);
  if (!session) return res.status(404).json({ error: 'Session non trouvée' });
  await session.destroy();
  res.status(204).send();
};

export { createSession, updateSession, deleteSession };
