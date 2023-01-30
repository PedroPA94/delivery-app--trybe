const express = require('express');

const loginRouter = require('./loginRoutes');
const registerRouter = require('./registerRoutes');
const sellerRouter = require('./sellerRoutes');
const saleRouter = require('./saleRoutes');
const productRouter = require('./productRoutes');
const customerRouter = require('./customerRoutes');

const routers = express.Router();

routers.use('/login', loginRouter);

routers.use('/register', registerRouter);

routers.use('/seller', sellerRouter);

routers.use('/sale', saleRouter);

routers.use('/customer', customerRouter);

routers.use('/products', productRouter);

module.exports = routers;
