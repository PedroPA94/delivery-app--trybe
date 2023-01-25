const { Product } = require('../database/models');

const findAllProducts = async () => Product.findAll();

module.exports = {
  findAllProducts,
};
