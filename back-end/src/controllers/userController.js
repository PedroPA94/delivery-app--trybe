const userService = require('../services/userService');

const createUser = async (req, res) => {
  const user = req.body;
  const newUser = await userService.create(user);
  return res.status(201).json(newUser);
};

const getSellers = async (_req, res) => {
  const sellers = await userService.getSellers();
  return res.status(200).json(sellers);
};

const getUsers = async (_req, res) => {
  const users = await userService.getUsers();
  return res.status(200).json(users);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await userService.deleteUser(id);
  return res.status(201).end();
};

module.exports = {
  createUser,
  getSellers,
  getUsers,
  deleteUser,
};
