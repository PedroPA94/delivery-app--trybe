const { Router } = require('express');
const productController = require('../controllers/customerController');

const routes = Router();

routes.get('/products', productController);

module.exports = routes;

