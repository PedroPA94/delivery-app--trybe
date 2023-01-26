const loginService = require('../services/loginService');

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await loginService.doLogin(email, password);
  res.status(200).json(user);
};

module.exports = {
  postLogin,
};
