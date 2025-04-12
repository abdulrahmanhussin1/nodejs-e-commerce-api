const ApiError = require('./ApiError');

const exists = (res, model, modelName, next) => {
  if (!model) {
    next(new ApiError(`${modelName} Not Found`, 404));
    return true; // Indicate that the function has handled the response
  }
  return false;
};

module.exports = exists;
