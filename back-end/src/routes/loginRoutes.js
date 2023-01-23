const { Router } = require('express');
const doLogin = require('../services/loginService');

const routes = Router();

routes.post('/login',(req, res) => doLogin(req.body.email, req.body.password));

module.exports = routes;
