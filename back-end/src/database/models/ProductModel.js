module.exports = (sequelize, DataTypes) => {
  const ProductModel = sequelize.define('Product', {
     id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER 
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL
  },
  url_image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  }, {
  underscored: true,
  sequelize: db,
  modelName: 'products',
  timestamps: false,
});
ProductModel.associate = (models) => {
  ProductModel.hasMany(models.SaleProductModel, { foreignKey: 'productId', as: 'product'});
}

return ProductModel;
};

// // import { INTEGER, Model, STRING, DECIMAL, DataTypes } from 'sequelize';
// // import db, { sequelize } from '.';

// class ProductModel extends Model {}

// ProductModel.init({
//   id: {
//     primaryKey: true,
//     autoIncrement: true,
//     allowNull: false,
//     type: INTEGER 
//   },
//   name: {
//     allowNull: false,
//     type: STRING,
//     unique: true
//   },
//   price: {
//     allowNull: false,
//     type: DECIMAL
//   },
//   url_image: {
//     allowNull: false,
//     type: STRING,
//   },
// }, {
//   underscored: true,
//   sequelize: db,
//   modelName: 'products',
//   timestamps: false,
// });

// export default ProductModel;
