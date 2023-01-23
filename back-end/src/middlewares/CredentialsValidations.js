class CredentialsValidations {
  static validateLoginInputs(req, _res, next) {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Invalid empty fields')
    validateLoginInputs.validateEmail(email);
    validateLoginInputs.validatePassword(password);
    next();
  }

  static validateEmail(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!emailRegex.test(email)) throw new Error('Invalid email')
  }

  static validatePassword(password) {
    if (password.length < 6) throw new Error('Invalid password')
  }
}

module.exports = CredentialsValidations;