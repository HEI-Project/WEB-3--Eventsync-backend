const { Room } = require('../../models');

// Allowed fields to prevent mass-assignment vuln
const sanitizeRoomInput = (input) => {
  const payload = {};
  if (Object.prototype.hasOwnProperty.call(input, 'name')) payload.name = input.name;
  return payload;
};

exports.createRoom = async (req, res) => {
  const payload = sanitizeRoomInput(req.body);
  const room = await Room.create(payload);
  res.status(201).json(room);
};
exports.updateRoom = async (req, res) => {
  const room = await Room.findByPk(req.params.id);
  if (!room) return res.status(404).json({ error: 'Salle non trouvée' });
  const payload = sanitizeRoomInput(req.body);
  await room.update(payload);
  res.json(room);
};
exports.deleteRoom = async (req, res) => {
  const room = await Room.findByPk(req.params.id);
  if (!room) return res.status(404).json({ error: 'Salle non trouvée' });
  await room.destroy();
  res.status(204).send();
};
