const express = require('express');

const loginRoutes = require('./loginRoutes');
const registerRouter = require('./registerRoutes');
const sellerRouter = require('./sellerRoutes');

const routers = express.Router();

routers.use('/login', loginRoutes);

routers.use('/register', registerRouter);

routers.use('/seller', sellerRouter)

module.exports = routers;
