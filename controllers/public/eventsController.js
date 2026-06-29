import { Event, Session, Room, Speaker } from '../../models/index.js';

const addLiveStatus = (sessions) => {
  const now = new Date();
  return sessions.map(s => {
    s.isLive = now >= new Date(s.startTime) && now <= new Date(s.endTime);
    return s;
  });
};

const getAllEvents = async (req, res) => {
  const events = await Event.findAll({
    order: [['startDate', 'ASC']],
    include: [{ model: Session, as: 'sessions' }]
  });
  res.json(events);
};

const getEventById = async (req, res) => {
  const event = await Event.findByPk(req.params.id, {
    include: [{ model: Session, as: 'sessions', include: ['room', { model: Speaker, as: 'speakers' }] }]
  });
  if (!event) return res.status(404).json({ error: 'Événement non trouvé' });
  const data = event.toJSON();
  if (data.sessions) data.sessions = addLiveStatus(data.sessions);
  res.json(data);
};

export { getAllEvents, getEventById };
