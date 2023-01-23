const validateUsername = (username) => {
  if (username.length < 12) throw new Error('Username must have at least 12 characters');
};

const validateEmail = (email) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) throw new Error('Invalid email');
};

const validatePassword = (password) => {
  if (password.length < 6) throw new Error('Password must have at least 6 characters');
};

const validateLoginInputs = (req, _res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throw new Error('Invalid empty fields');
  validateEmail(email);
  validatePassword(password);
  next();
};

const validateRegisterInputs = (req, _res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) throw new Error('Invalid empty fields');
  validateUsername(username);
  validateEmail(email);
  validatePassword(password);
  next();
};

module.exports = { validateLoginInputs, validateRegisterInputs };