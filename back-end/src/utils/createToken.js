const jwt = require('jsonwebtoken');

const createToken = (data) => {
  const token = jwt.sign({ data }, 'secret_key', {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  return token;
};
 
module.exports = {
  createToken,
};