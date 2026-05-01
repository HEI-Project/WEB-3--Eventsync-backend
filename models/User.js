import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin'), defaultValue: 'admin' }
}, {
  tableName: 'users',
  hooks: {
    beforeCreate: async (user) => { if (user.password) user.password = await bcrypt.hash(user.password, 10); }
  }
});

User.prototype.validatePassword = async function(pwd) { return await bcrypt.compare(pwd, this.password); };

export default User;
