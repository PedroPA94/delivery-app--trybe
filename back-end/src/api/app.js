const express = require('express');
const cors = require('cors');
const errorHandler = require('../middlewares/errorHandler');
const loginRoutes = require('../routes/loginRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use(loginRoutes);

app.use(errorHandler);

module.exports = app;
