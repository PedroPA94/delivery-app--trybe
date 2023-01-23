class CredentialsValidations {
  static validateLoginInputs(req, _res, next) {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Invalid empty fields')
    CredentialsValidations.validateEmail(email);
    CredentialsValidations.validatePassword(password);
    next();
  }

  static validateRegisterInputs(req, _res, next) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) throw new Error('Invalid empty fields')
    CredentialsValidations.validateUsername(username);
    CredentialsValidations.validateEmail(email);
    CredentialsValidations.validatePassword(password);
    next();
  }

  static validateUsername(username) {
    if (username.length < 12) throw new Error('Username must have at least 12 characters')
  }

  static validateEmail(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!emailRegex.test(email)) throw new Error('Invalid email')
  }

  static validatePassword(password) {
    if (password.length < 6) throw new Error('Password must have at least 6 characters')
  }
}

module.exports = CredentialsValidations;