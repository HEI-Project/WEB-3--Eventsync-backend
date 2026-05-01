const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Session = sequelize.define('Session', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  startTime: { type: DataTypes.DATE, allowNull: false },
  endTime: { type: DataTypes.DATE, allowNull: false },
  capacity: { type: DataTypes.INTEGER }
}, { tableName: 'sessions', timestamps: true });
module.exports = Session;
