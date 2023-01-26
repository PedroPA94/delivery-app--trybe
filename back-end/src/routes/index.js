const express = require('express');

const loginRouter = require('./loginRoutes');
const userRouter = require('./userRoutes');
const productRouter = require('./productRoutes');
// const imageRouter = require('./imageRoutes');

const routers = express.Router();

routers.use('/login', loginRouter);

routers.use('/register', userRouter);

routers.use('/products', productRouter);

// routers.use('/images', imageRouter);

module.exports = routers;
