const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Question = sequelize.define('Question', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  authorName: { type: DataTypes.STRING, defaultValue: 'Anonyme' },
  upvoteCount: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { tableName: 'questions', timestamps: true });
module.exports = Question;
