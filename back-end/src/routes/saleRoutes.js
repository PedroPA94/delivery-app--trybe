const { Router } = require('express');
const saleController = require('../controllers/saleController');

const routes = Router();

routes.post('/', saleController.createSale);

routes.put('/', saleController.updateSaleStatus);

module.exports = routes;
