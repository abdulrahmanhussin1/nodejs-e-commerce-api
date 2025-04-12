const { validationResult } = require('express-validator');
const ApiError = require('../../helpers/ApiError');

const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new ApiError('Invalid request data', 400, errors.array()));
  }
  next();
};

module.exports = validatorMiddleware;
