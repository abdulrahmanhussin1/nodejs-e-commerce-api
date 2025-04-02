const { validationResult } = require('express-validator');
const ApiError = require('../../helpers/ApiError');

const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new ApiError('Invalid·Category·ID', 400));
  }
  next();
};

module.exports = validatorMiddleware;
