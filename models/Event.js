const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Event = sequelize.define('Event', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  location: { type: DataTypes.STRING }
}, { tableName: 'events', timestamps: true });
module.exports = Event;
