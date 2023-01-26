const path = require('path');
const express = require('express');
const cors = require('cors');
const errorHandler = require('../middlewares/errorHandler');
const routes = require('../routes');

const app = express();
app.use(express.json());
app.use(cors());
const absolutePath = path.resolve('images');

app.use('/images', express.static(absolutePath));
app.use(routes);

app.use(errorHandler);

module.exports = app;
