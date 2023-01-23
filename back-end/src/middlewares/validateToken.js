const jwt = require('jsonwebtoken');

const createToken = (data) => {
  const token = jwt.sign({ data }, 'secret_key', {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  return token;
};

const validateToken = (token) => {
    const { data } = jwt.verify(token);
    if (!data) throw new Error('Expired or invalid token');
    return data;
};

module.exports = {
  createToken,
  validateToken,
};
