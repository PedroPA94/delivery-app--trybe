const loginService = require('../service/loginService');

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const token = await loginService.doLogin(email, password);
  res.status(200).json({ token });
};

module.exports = {
  postLogin,
};