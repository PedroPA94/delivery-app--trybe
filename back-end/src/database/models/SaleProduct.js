module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
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
    modelName: 'sales_products',
    timestamps: false,
  });

  SaleProduct.associate = (models) => {
    SaleProduct.belongsTo(models.Sale, { foreignKey: 'id', as: 'sale'});
    SaleProduct.belongsTo(models.Product, { foreignKey: 'id', as: 'product'});
  }

  return SaleProduct;
};
