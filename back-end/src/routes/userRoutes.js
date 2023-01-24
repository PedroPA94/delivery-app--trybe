const { Router } = require("express");
const userController = require("../controller/userController");

require("express-async-errors");

const {
  validateRegisterInputs,
} = require("../middlewares/credentialsValidations");

const routes = Router();

routes.use(validateRegisterInputs);
routes.post("/", userController.createUser);

module.exports = routes;
