const { Router } = require('express');
const userController = require('../controllers/userController');
require('express-async-errors');

const {
  validateRegisterInputs,
} = require('../middlewares/credentialsValidations');
const { validateAdmin } = require('../middlewares/validateAdmin');
const { validateToken } = require('../middlewares/validateToken');

const routes = Router();

routes.use(validateToken);
routes.use(validateAdmin);

routes.post('/', validateRegisterInputs, userController.createUser);
routes.get('/', userController.getUsers);
routes.delete('/:id', userController.deleteUser);

module.exports = routes;
