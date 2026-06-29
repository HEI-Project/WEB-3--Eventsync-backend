import { Room, Session, Speaker } from '../../models/index.js';

const addLiveStatus = (session) => {
  const now = new Date();
  return session.isLive = now >= new Date(session.startTime) && now <= new Date(session.endTime)
};

const getAllRooms = async (req, res) => {
  const rooms = await Room.findAll({ include: [{ model: Session, as: 'sessions' }] });
  const data = rooms.map(r => {
    const room = r.toJSON();
    if (room.sessions) room.sessions = addLiveStatus(room.sessions);
    return room;
  });
  res.json(data);
};

const getRoomById = async (req, res) => {
  const room = await Room.findByPk(req.params.id, {
    include: [{
      model: Session,
      as: 'sessions',
      include: [{ model: Speaker, as: 'speakers' }],
      order: [['startTime', 'ASC']]
    }]
  });
  if (!room) return res.status(404).json({ error: 'Salle non trouvée' });
  const data = room.toJSON();
  if (data.sessions) data.sessions = addLiveStatus(data.sessions);
  res.json(data);
};

export { getAllRooms, getRoomById };
