import { Event, Session, Speaker } from '../../models/index.js';
import { paginate, paginatedResponse } from '../../utils/pagination.js';

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

const listEvents = async (req, res) => {
  const { offset, limit, page, pageSize } = paginate(req.query);
  const { rows, count } = await Event.findAndCountAll({
    distinct: true,
    order: [['startDate', 'ASC']],
    include: [{ model: Session, as: 'sessions', separate: true }],
    offset,
    limit,
  });
  res.json(paginatedResponse(rows, count, page, pageSize));
};

const getEventById = async (req, res) => {
  const event = await Event.findByPk(req.params.id, {
    include: [{ model: Session, as: 'sessions', include: ['room', { model: Speaker, as: 'speakers' }] }]
  });
  if (!event) return res.status(404).json({ error: 'Événement non trouvé' });
  res.json(event);
};

export { createEvent, updateEvent, deleteEvent, listEvents, getEventById };
