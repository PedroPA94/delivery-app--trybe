const { Router } = require('express');
const loginController = require('../controller/loginController');
const { validateLoginInputs } = require('../middlewares/credentialsValidations');

const routes = Router();

routes.use(validateLoginInputs)
routes.post('/login', loginController.postLogin);

module.exports = routes;
