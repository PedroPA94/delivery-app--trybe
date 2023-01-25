const { Router } = require('express');
const productController = require('../controllers/productController');
const { validateToken } = require('../middlewares/validateToken');
require('express-async-errors');

const routes = Router();

routes.use(validateToken);
routes.get('/', productController.getProducts);

module.exports = routes;
