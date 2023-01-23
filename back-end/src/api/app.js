const express = require('express');
const CredentialsValidations = require('../middlewares/CredentialsValidations');
const ErrorHandler = require('../middlewares/ErrorHandler');

const app = express();
app.use(express.json())

app.post('/coffee', (_req, res) => res.status(418).end());

app.use(ErrorHandler.handle)

module.exports = app;
