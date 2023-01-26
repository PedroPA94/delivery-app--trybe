const { Router } = require('express');
const userController = require('../controllers/userController');

require('express-async-errors');

const {
  validateRegisterInputs,
} = require('../middlewares/credentialsValidations');
const { validateAdmin } = require('../middlewares/validateAdmin');
const { validateToken } = require('../middlewares/validateToken');

const routes = Router();

routes.use(validateRegisterInputs);

routes.post('/admin', validateToken, validateAdmin, userController.createUser);

routes.post('/', userController.createUser);

module.exports = routes;
