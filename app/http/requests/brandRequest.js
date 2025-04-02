const { check } = require('express-validator');
const validatorMiddleware = require('../middlewares/validatorMiddleware');

// Importing the brand validator
exports.validateBrandByIdRequest = [
  check('id').isMongoId().withMessage('Invalid brand ID'),
  validatorMiddleware,
];

exports.createBrandRequest = [
  check('name')
    .notEmpty()
    .withMessage('Brand Name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Brand Name must be between 3 and 50 characters')
    .trim(),

  check('description')
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage('Brand Description must be between 10 and 500 characters'),

  check('image')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL')
    .default('https://via.placeholder.com/150'),
  validatorMiddleware,
];

exports.updateBrandRequest = [
  check('id').isMongoId().withMessage('Invalid brand ID'),
  check('name')
    .notEmpty()
    .withMessage('Brand Name is required') // Required
    .isLength({ min: 3, max: 50 })
    .withMessage('Brand Name must be between 3 and 50 characters') // Length validation
    .trim(),

  check('description')
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage('Brand Description must be between 10 and 500 characters'),

  check('image')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  validatorMiddleware,
];
