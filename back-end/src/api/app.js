const express = require('express');
const errorHandler = require('../middlewares/errorHandler');

const app = express();
app.use(express.json());

app.post('/coffee', (_req, res) => res.status(418).end());

app.use(errorHandler);

module.exports = app;
