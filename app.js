const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Load environment variables from .env file
dotenv.config();

// Custom error handling middleware
const ApiError = require('./app/helpers/ApiError');
const globalError = require('./app/http/middlewares/errorMiddleware');

// Database connection
const dbConnection = require('./config/database');

dbConnection();

// Routes
const routes = require('./routes/routes');

// Initialize the Express app instance
const app = express();

// Middleware
app.use(express.json());

// Development mode logging middleware (morgan) for easier debugging in development environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`node: ${process.env.NODE_ENV}`);
}

// Use Routes
app.use('/api/v1', routes);

// Global error handling middleware
app.all('*', (req, res, next) => {
  next(new ApiError(`Route ${req.originalUrl} Not Found`, 404));
});

// Error handling middleware (express-validator)
app.use(globalError);

const PORT = process.env.PORT || 3000;

// Start the server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

// Listen for uncaught promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error('Server is closing due to unhandled rejection....');
    process.exit(1);
  });
});
