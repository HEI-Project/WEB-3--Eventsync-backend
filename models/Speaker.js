const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Speaker = sequelize.define('Speaker', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  fullName: { type: DataTypes.STRING, allowNull: false },
  photoUrl: { type: DataTypes.STRING },
  bio: { type: DataTypes.TEXT },
  externalLinks: { type: DataTypes.JSONB, defaultValue: [] }
}, { tableName: 'speakers', timestamps: true });
module.exports = Speaker;
