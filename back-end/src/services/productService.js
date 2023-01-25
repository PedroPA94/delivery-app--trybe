const Product = require('../database/models/Product');

const findAllProducts = async () => {
  await Product.findaAll();
};

module.exports = {
  findAllProducts,
};
