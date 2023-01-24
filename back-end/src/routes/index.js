const express = require("express");

const loginRoutes = require("./loginRoutes");
const userRouter = require("./userRoutes");

const routers = express.Router();

routers.use("/login", loginRoutes);

routers.use("/register", userRouter);

module.exports = routers;
