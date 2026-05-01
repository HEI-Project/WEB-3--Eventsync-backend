const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Room = sequelize.define('Room', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'rooms', timestamps: true });
module.exports = Room;
