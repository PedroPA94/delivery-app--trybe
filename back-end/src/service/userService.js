const { User } = require("../database/models");
const md5 = require("md5");

const create = async (data) => {
  const { name, email, password, role = "customer" } = data;

  const user = await User.findOne({ where: { email } });

  if (user) throw new Error("User already exist");

  const cryptPassword = md5(password);
  const newUser = await User.create({
    name,
    email,
    password: cryptPassword,
    role,
  });

  return { id: newUser.id, name, email };
};

module.exports = {
  create,
};
