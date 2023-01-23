const { Router } = require('express');
const loginController = require('../controller/loginController');

const routes = Router();

routes.post('/login', loginController.postLogin);

module.exports = routes;
