import { Event, Session } from '../../models/index.js';

const sanitizeEventInput = (input) => {
  const payload = {};
  if (Object.prototype.hasOwnProperty.call(input, 'title')) payload.title = input.title;
  if (Object.prototype.hasOwnProperty.call(input, 'description')) payload.description = input.description;
  if (Object.prototype.hasOwnProperty.call(input, 'startDate')) payload.startDate = input.startDate;
  if (Object.prototype.hasOwnProperty.call(input, 'endDate')) payload.endDate = input.endDate;
  if (Object.prototype.hasOwnProperty.call(input, 'location')) payload.location = input.location;
  return payload;
};

const createEvent = async (req, res) => {
  const payload = sanitizeEventInput(req.body);
  const event = await Event.create(payload);
  res.status(201).json(event);
};

const updateEvent = async (req, res) => {
  const event = await Event.findByPk(req.params.id);
  if (!event) return res.status(404).json({ error: 'Événement non trouvé' });
  const payload = sanitizeEventInput(req.body);
  await event.update(payload);
  res.json(event);
};

const deleteEvent = async (req, res) => {
  const event = await Event.findByPk(req.params.id);
  if (!event) return res.status(404).json({ error: 'Événement non trouvé' });
  await event.destroy();
  res.status(204).send();
};

export { createEvent, updateEvent, deleteEvent };
