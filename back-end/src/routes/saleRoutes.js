const { Router } = require('express');
const saleController = require('../controllers/saleController');

const routes = Router();

routes.post('/', saleController.createSale);

routes.put('/', saleController.updateSaleStatus);
routes.get('/', saleController.getAllSales);
routes.get('/:id', saleController.getDetailedSale);

module.exports = routes;
