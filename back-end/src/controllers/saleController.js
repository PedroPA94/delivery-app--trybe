const saleService = require('../services/saleService');

const createSale = async (req, res) => {
  const saleId = await saleService.createSale(req.body);
  return res.status(201).json({ saleId });
};

const updateSaleStatus = async (req, res) => {
  const { saleId, status } = req.body;
  console.log(status, 'status');
  const result = await saleService.updateSaleStatus(saleId, status);
  return res.status(200).json(result);
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
  updateSaleStatus,
  getDetailedSale,
  getAllSales,
};
