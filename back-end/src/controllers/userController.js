const userService = require('../services/userService');

const createUser = async (req, res) => {
  const user = req.body;
  const newUser = await userService.create(user);
  return res.status(201).json(newUser);
};

module.exports = {
  createUser,
};
