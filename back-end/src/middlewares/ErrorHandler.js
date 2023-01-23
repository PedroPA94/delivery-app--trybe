const errors = [
  { status: 400, message: 'Invalid empty fields' },
  { status: 400, message: 'Invalid email' },
  { status: 400, message: 'Username must have at least 12 characters' },
  { status: 400, message: 'Password must have at least 6 characters' },
  { status: 404, message: 'Not found' },
];

class ErrorHandler {
  static handle(error, _req, res, next) {
    const errorCode = errors.find((err) => err.message === error.message).status || 500;
    res.status(errorCode).json({ message: error.message });
    next();
  }
}

module.exports = ErrorHandler;