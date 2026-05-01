import { Room } from '../../models/index.js';

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

export { createRoom, updateRoom, deleteRoom };
