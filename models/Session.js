import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Session = sequelize.define('Session', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  startTime: { type: DataTypes.DATE, allowNull: false },
  endTime: { type: DataTypes.DATE, allowNull: false },
  capacity: { type: DataTypes.INTEGER },
  eventId: { type: DataTypes.UUID, allowNull: false, references: { model: 'events', key: 'id' } },
  roomId: { type: DataTypes.UUID, allowNull: false, references: { model: 'rooms', key: 'id' } }
}, { tableName: 'sessions', timestamps: true });

export default Session;
