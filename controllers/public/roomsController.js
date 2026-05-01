import { Room, Session, Speaker } from '../../models/index.js';

const getAllRooms = async (req, res) => {
  const rooms = await Room.findAll({ include: [{ model: Session, as: 'sessions' }] });
  res.json(rooms);
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
  res.json(room);
};

export { getAllRooms, getRoomById };
