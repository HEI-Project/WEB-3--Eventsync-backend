const { Event, Session, Room, Speaker } = require('../../models');
const { Op } = require('sequelize');

exports.getAllEvents = async (req, res) => {
  const events = await Event.findAll({ order: [['startDate', 'ASC']] });
  res.json(events);
};

exports.getEventById = async (req, res) => {
  const event = await Event.findByPk(req.params.id, {
    include: [{ model: Session, as: 'sessions', include: ['room', { model: Speaker, as: 'speakers' }] }]
  });
  if (!event) return res.status(404).json({ error: 'Événement non trouvé' });
  res.json(event);
};
