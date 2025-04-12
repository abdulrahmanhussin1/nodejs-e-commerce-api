// @desc This Class represents the state of the application Errors
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = `${statusCode}`.startsWith(4) ? 'fail' : 'error';
    this.isOperationError = true;
  }
}

module.exports = ApiError;
