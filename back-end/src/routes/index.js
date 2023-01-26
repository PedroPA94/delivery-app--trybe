const express = require('express');

const loginRoutes = require('./loginRoutes');
const registerRouter = require('./registerRoutes');
const sellerRouter = require('./sellerRoutes');
const saleRouter = require('./saleRoutes');

const routers = express.Router();

routers.use('/login', loginRoutes);

routers.use('/register', registerRouter);

routers.use('/seller', sellerRouter);

routers.use('/sale', saleRouter);

module.exports = routers;
