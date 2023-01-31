const md5 = require('md5');
const { User } = require('../database/models');
const { createToken } = require('../utils/createToken');

const doLogin = async (email, loginPassword) => {
  const user = await User.findOne({ where: { email } });
// console.log(user);
  if (!user) throw new Error('User not found');
  if (md5(loginPassword) !== user.password) throw new Error('Incorrect password');

  const { password, id, ...userInfo } = user.dataValues;
  const token = createToken(userInfo);
  return { ...userInfo, token };
};

module.exports = {
  doLogin,
};
