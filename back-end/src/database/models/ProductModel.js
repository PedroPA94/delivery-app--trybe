import { INTEGER, Model, STRING, DECIMAL } from 'sequelize';
import db from '.';

class ProductModel extends Model {}

ProductModel.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: INTEGER 
  },
  name: {
    allowNull: false,
    type: STRING,
    unique: true
  },
  price: {
    allowNull: false,
    type: DECIMAL
  },
  url_image: {
    allowNull: false,
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'products',
  timestamps: false,
});

export default ProductModel;
