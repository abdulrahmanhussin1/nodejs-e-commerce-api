// Handle errors in JSON response format in development environment
const sendErrForDev = (err, res) =>
  res.status(err.statusCode).json({
    success: false,
    message: err.message || 'Something went wrong',
    error: err,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });

// Handle errors in JSON response format in production environment
const sendErrForProd = (err, res) =>
  res.status(err.statusCode).json({
    success: false,
    message: err.message || 'Something went wrong',
  });
const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (err.name === 'ValidationError') {
    err.statusCode = 400;
  }

  if (process.env.NODE_ENV === 'development') {
    sendErrForDev(err, res);
  } else {
    sendErrForProd(err, res);
  }
};

module.exports = globalError;
