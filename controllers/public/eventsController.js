import { Event, Session, Room, Speaker } from '../../models/index.js';

const addLiveStatus = (sessions) => {
  const now = new Date();
  return sessions.map(s => {
    const data = { ...s };
    data.isLive = now >= new Date(data.startTime) && now <= new Date(data.endTime);
    return data;
  });
};

const getAllEvents = async (req, res) => {
  const events = await Event.findAll({ order: [['startDate', 'ASC']] });
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
