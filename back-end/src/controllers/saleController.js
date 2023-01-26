const saleService = require('../service/saleService');

const createSale = async (req, res) => {
  const saleId = await saleService.createSale(req.body);
  return res.status(201).json({ saleId });
};

module.exports = {
  createSale,
};