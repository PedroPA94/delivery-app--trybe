const { Router } = require('express');
const productController = require('../controllers/productController');
require('express-async-errors');

const routes = Router();

routes.get('/', productController.getProducts);

module.exports = routes;
