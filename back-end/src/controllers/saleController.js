const saleService = require('../services/saleService');

const createSale = async (req, res) => {
  const saleId = await saleService.createSale(req.body);
  return res.status(201).json({ saleId });
};

const getAllSales = async (_req, res) => {
  const result = await saleService.getAllSales();
  res.status(200).json(result);
};

const getDetailedSale = async (req, res) => {
  const { id } = req.params;
  const result = await saleService.getDetailedSale(id);
  res.status(200).json(result);
};

module.exports = {
  createSale,
  getDetailedSale,
  getAllSales,
};
