module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
     id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER 
  },
  user_id: {
    allowNull: false,
    type: DataTypes.INTEGER, 
  },
  seller_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  total_price: {
    allowNull: false,
    type: DataTypes.DECIMAL
  },
  delivery_address: {
    allowNull: false,
    type: DataTypes.STRING
  },
  delivery_number: {
    allowNull: false,
    type: DataTypes.STRING
  },
  sale_date: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING
  }
}, {
  underscored: true,
  modelName: 'sales',
  timestamps: false,
});
Sale.associate = (models) => {
  Sale.hasMany(models.SaleProduct, { foreignKey: 'saleId', as: 'sale'});
}

return Sale;
};
