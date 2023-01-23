const express = require('express');
const ErrorHandler = require('../middlewares/ErrorHandler');

const app = express();
app.use(express.json());

app.post('/coffee', (_req, res) => res.status(418).end());

app.use(ErrorHandler.handle);

module.exports = app;
