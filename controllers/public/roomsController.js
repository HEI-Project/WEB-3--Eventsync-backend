import { Room, Session } from '../../models/index.js';
export const getAllRooms = async (req, res) => {
  const rooms = await Room.findAll({ include: [{ model: Session, as: 'sessions' }] });
  res.json(rooms);
};
