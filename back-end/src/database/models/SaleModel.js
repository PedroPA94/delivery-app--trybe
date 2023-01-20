import { INTEGER, Model, STRING, DECIMAL } from 'sequelize';
import db from '.';
import UserModel from './UserModel';

class SaleModel extends Model {}

SaleModel.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: INTEGER 
  },
  user_id: {
    allowNull: false,
    type: INTEGER, 
  },
  seller_id: {
    allowNull: false,
    type: INTEGER,
  },
  total_price: {
    allowNull: false,
    type: DECIMAL
  },
  delivery_address: {
    allowNull: false,
    type: STRING
  },
  delivery_number: {
    allowNull: false,
    type: STRING
  },
  sale_date: {
    allowNull: false,
    type: DATE,
  },
  status: {
    allowNull: false,
    type: STRING
  }
}, {
  underscored: true,
  sequelize: db,
  modelName: 'sales',
  timestamps: false,
});

SaleModel.belongsTo(UserModel, { foreignKey: 'id', as: 'userId'});
SaleModel.belongsTo(UserModel, { foreignKey: 'id', as: 'sellerId'});

UserModel.hasMany(SaleModel, { foreignKey: 'userId', as: 'user'});
UserModel.hasMany(SaleModel, { foreignKey: 'sellerId', as: 'seller'});

export default SaleModel;