const { Router } = require('express');
const userController = require('../controllers/userController');

const routes = Router();

routes.get('/', userController.getSellers);

module.exports = routes;
