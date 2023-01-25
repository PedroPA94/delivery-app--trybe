const { Router } = require('express');
const imageController = require('../controllers/imageController')
require('express-async-errors');

const routes = Router();

routes.get('/:filename', imageController.getImage);

module.exports = routes;
