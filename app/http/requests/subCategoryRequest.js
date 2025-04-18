const { check } = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const Category = require('../../models/category');

// Importing the category validator
exports.validateSubCategoryByIdRequest = [
  check('id').isMongoId().withMessage('Invalid subCategory ID'),
  validatorMiddleware,
];

exports.createSubCategoryRequest = [
  check('name')
    .notEmpty()
    .withMessage('SubCategory Name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('SubCategory Name must be between 3 and 50 characters')
    .trim()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check('description')
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage(
      'SubCategory Description must be between 10 and 500 characters',
    ),

  check('categoryId').isMongoId().withMessage('Invalid Category ID'),

  check('image')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL')
    .default('https://via.placeholder.com/150'),
  validatorMiddleware,
];

exports.updateSubCategoryRequest = [
  check('id').isMongoId().withMessage('Invalid subCategory ID'),
  check('name')
    .notEmpty()
    .withMessage('SubCategory Name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('SubCategory Name must be between 3 and 50 characters')
    .trim()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check('description')
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage(
      'SubCategory Description must be between 10 and 500 characters',
    ),

  check('categoryId')
    .isMongoId()
    .withMessage('Invalid Category ID')
    .custom(async (value, { req }) => {
      const category = await Category.findById(value);
      if (!category) {
        throw new Error('No Category Id in Category collection');
      }
      return true;
    }),

  check('image')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  validatorMiddleware,
];
