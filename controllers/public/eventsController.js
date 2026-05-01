import { Event, Session, Room, Speaker } from '../../models/index.js';
import { Op } from 'sequelize';

const getAllEvents = async (req, res) => {
  const events = await Event.findAll({ order: [['startDate', 'ASC']] });
  res.json(events);
};

const getEventById = async (req, res) => {
  const event = await Event.findByPk(req.params.id, {
    include: [{ model: Session, as: 'sessions', include: ['room', { model: Speaker, as: 'speakers' }] }]
  });
  if (!event) return res.status(404).json({ error: 'Événement non trouvé' });
  res.json(event);
};

export { getAllEvents, getEventById };
