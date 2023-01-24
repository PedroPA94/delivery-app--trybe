const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
// const loginRoutes = require("../routes/loginRoutes");
// const userRoutes = require("../routes/userRoutes");
const routes = require("../routes");

const app = express();
app.use(express.json());

app.use("/", routes);

// app.use(userRoutes);

app.use(errorHandler);

module.exports = app;
