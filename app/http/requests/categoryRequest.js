const { check } = require('express-validator');
const validatorMiddleware = require('../middlewares/validatorMiddleware');

// Importing the category validator
exports.validateCategoryByIdRequest = [
  check('id').isMongoId().withMessage('Invalid category ID'),
  validatorMiddleware,
];

exports.createCategoryRequest = [
  check('name')
    .notEmpty()
    .withMessage('Category Name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Category Name must be between 3 and 50 characters')
    .trim(),

  check('description')
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage('Category Description must be between 10 and 500 characters'),

  check('image')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL')
    .default('https://via.placeholder.com/150'),
  validatorMiddleware,
];

exports.updateCategoryRequest = [
  check('id').isMongoId().withMessage('Invalid category ID'),
  check('name')
    .notEmpty()
    .withMessage('Category Name is required') // Required
    .isLength({ min: 3, max: 50 })
    .withMessage('Category Name must be between 3 and 50 characters') // Length validation
    .trim(),

  check('description')
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage('Category Description must be between 10 and 500 characters'),

  check('image')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  validatorMiddleware,
];
