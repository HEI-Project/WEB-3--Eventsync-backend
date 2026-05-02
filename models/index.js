import { sequelize } from '../config/database.js';
import User from './User.js';
import Event from './Event.js';
import Session from './Session.js';
import Room from './Room.js';
import Speaker from './Speaker.js';
import Question from './Question.js';

// Associations
Event.hasMany(Session, { foreignKey: 'eventId', as: 'sessions' });
Session.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });

Session.belongsTo(Room, { foreignKey: 'roomId', as: 'room' });
Room.hasMany(Session, { foreignKey: 'roomId', as: 'sessions' });

Session.belongsToMany(Speaker, { through: 'SessionSpeakers', as: 'speakers', foreignKey: 'sessionId', otherKey: 'speakerId' });
Speaker.belongsToMany(Session, { through: 'SessionSpeakers', as: 'sessions', foreignKey: 'speakerId', otherKey: 'sessionId' });

Session.hasMany(Question, { foreignKey: 'sessionId', as: 'questions' });
Question.belongsTo(Session, { foreignKey: 'sessionId', as: 'session' });

export { sequelize, User, Event, Session, Room, Speaker, Question };
