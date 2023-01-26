const { Router } = require('express');
const userController = require('../controllers/userController');

require('express-async-errors');

const {
  validateRegisterInputs,
} = require('../middlewares/credentialsValidations');

const routes = Router();

routes.use(validateRegisterInputs);
routes.post('/', userController.createUser);

module.exports = routes;
