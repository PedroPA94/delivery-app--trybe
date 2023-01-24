const loginService = require('../service/loginService');

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const { token, role } = await loginService.doLogin(email, password);
  res.status(200).json({ token, role });
};

module.exports = {
  postLogin,
};
