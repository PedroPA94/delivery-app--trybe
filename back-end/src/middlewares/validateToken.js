const jwt = require('jsonwebtoken');

const validateToken = (req, _res, next) => {
  const token = req.headers.authorization;
  const secret = 'secret_key';

  if (!token) throw new Error('Token not found');
  const { data } = jwt.verify(token, secret);
  if (!data) throw new Error('Expired or invalid token');
  next();
};

module.exports = {
  validateToken,
};
