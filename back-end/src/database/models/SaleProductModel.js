module.exports = (sequelize, DataTypes) => {
  const SaleProductModel = sequelize.define('SaleProduct', {
    sale_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    product_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    underscored: true,
    sequelize: db,
    modelName: 'sales_products',
    timestamps: false,
  });

  SaleProductModel.associate = (models) => {
    SaleProductModel.belongsTo(models.SaleModel, { foreignKey: 'id', as: 'saleId'});
    SaleProductModel.belongsTo(models.ProductModel, { foreignKey: 'id', as: 'productId'});
  }
// SaleModel.hasMany(SaleProductModel, { foreignKey: 'saleId', as: 'sale'});
// ProductModel.hasMany(SaleProductModel, { foreignKey: 'productId', as: 'product'});
  return SaleProductModel;
};

// import { INTEGER, Model } from 'sequelize';
// import db from '.';
// import ProductModel from './ProductModel';
// import SaleModel from './SaleModel';

class SaleProductModel extends Model {}

SaleProductModel.init({
  sale_id: {
    allowNull: false,
    type: INTEGER,
    primaryKey: true,
  },
  product_id: {
    allowNull: false,
    type: INTEGER,
    primaryKey: true,
  },
  quantity: {
    allowNull: false,
    type: INTEGER
  }
}, {
  underscored: true,
  sequelize: db,
  modelName: 'sales_products',
  timestamps: false,
});

SaleProductModel.belongsTo(SaleModel, { foreignKey: 'id', as: 'saleId'});
SaleProductModel.belongsTo(ProductModel, { foreignKey: 'id', as: 'productId'});

SaleModel.hasMany(SaleProductModel, { foreignKey: 'saleId', as: 'sale'});
ProductModel.hasMany(SaleProductModel, { foreignKey: 'productId', as: 'product'});

export default SaleProductModel;
