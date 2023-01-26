const saleService = require('../service/saleService');

const createSale = async (req, res) => {
  const sale = await saleService.createSale(req.body);
  return res.status(201).json(sale);
};

module.exports = {
  createSale,
};