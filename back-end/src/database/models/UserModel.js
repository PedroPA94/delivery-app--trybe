import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class UserModel extends Model {}

UserModel.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: INTEGER,
  },
  name: {
    allowNull: false,
    type: STRING
  },
  email: {
    allowNull: false,
    type: STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: STRING
  },
  role: {
    allowNull: false,
    type: STRING
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default UserModel;
