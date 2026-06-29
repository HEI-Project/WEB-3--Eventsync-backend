import { Room, Session, Speaker } from '../../models/index.js';
import { paginate, paginatedResponse } from '../../utils/pagination.js';

const sanitizeRoomInput = (input) => {
  const payload = {};
  if (Object.prototype.hasOwnProperty.call(input, 'name')) payload.name = input.name;
  return payload;
};

const createRoom = async (req, res) => {
  const payload = sanitizeRoomInput(req.body);
  const room = await Room.create(payload);
  res.status(201).json(room);
};

const updateRoom = async (req, res) => {
  const room = await Room.findByPk(req.params.id);
  if (!room) return res.status(404).json({ error: 'Salle non trouvée' });
  const payload = sanitizeRoomInput(req.body);
  await room.update(payload);
  res.json(room);
};

const deleteRoom = async (req, res) => {
  const room = await Room.findByPk(req.params.id);
  if (!room) return res.status(404).json({ error: 'Salle non trouvée' });
  await room.destroy();
  res.status(204).send();
};

const listRooms = async (req, res) => {
  const { offset, limit, page, pageSize } = paginate(req.query);
  const { rows, count } = await Room.findAndCountAll({
    distinct: true,
    include: [{ model: Session, as: 'sessions', separate: true }],
    offset,
    limit,
  });
  res.json(paginatedResponse(rows, count, page, pageSize));
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

export { createRoom, updateRoom, deleteRoom, listRooms, getRoomById };
