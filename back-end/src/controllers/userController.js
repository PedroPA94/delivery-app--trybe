const userService = require('../service/userService');

const createUser = async (req, res) => {
  const user = req.body;
  const newUser = await userService.create(user);
  return res.status(201).json(newUser);
};

const getSellers = async (_req, res) => {
  const sellers = await userService.getSellers();
  return res.status(200).json(sellers);
};

module.exports = {
  createUser,
  getSellers,
};
