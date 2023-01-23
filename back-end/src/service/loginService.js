const md5 = require('md5');
const { User } = require('../database/models');
const { createToken } = require('../middlewares/validateToken');

const doLogin = async (email, loginPassword) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw new Error('User not found');
  if (md5(loginPassword) !== user.password) throw new Error('Incorrect password');

  const { password, ...userInfo } = user;
  const token = createToken(userInfo);
  return { token, role: user.role };  
};

module.exports = {
  doLogin,
};