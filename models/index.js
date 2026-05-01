const sequelize = require('../config/database');
const User = require('./User');
const Event = require('./Event');
const Session = require('./Session');
const Room = require('./Room');
const Speaker = require('./Speaker');
const Question = require('./Question');

// Associations
Event.hasMany(Session, { foreignKey: 'eventId', as: 'sessions' });
Session.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });

Session.belongsTo(Room, { foreignKey: 'roomId', as: 'room' });
Room.hasMany(Session, { foreignKey: 'roomId', as: 'sessions' });

Session.belongsToMany(Speaker, { through: 'SessionSpeakers', as: 'speakers' });
Speaker.belongsToMany(Session, { through: 'SessionSpeakers', as: 'sessions' });

Session.hasMany(Question, { foreignKey: 'sessionId', as: 'questions' });
Question.belongsTo(Session, { foreignKey: 'sessionId', as: 'session' });

module.exports = { sequelize, User, Event, Session, Room, Speaker, Question };
