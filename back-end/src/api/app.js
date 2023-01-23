const express = require('express');
const errorHandler = require('../middlewares/errorHandler');
const loginRoutes = require('../routes/loginRoutes');

const app = express();
app.use(express.json());

app.use(loginRoutes);

app.use(errorHandler);

module.exports = app;
