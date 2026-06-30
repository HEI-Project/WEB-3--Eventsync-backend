import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const QuestionUpvote = sequelize.define('QuestionUpvote', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  questionId: { type: DataTypes.UUID, allowNull: false },
  ip: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'QuestionUpvotes', timestamps: true });

export default QuestionUpvote;
