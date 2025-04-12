const { body, param } = require('express-validator');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const SubCategory = require('../../models/subCategory');
const Brand = require('../../models/brand');

exports.createProductRequest = [
  body('name')
    .notEmpty()
    .withMessage('Product Name is required')
    .isLength({ min: 3 })
    .withMessage('Product Name must be at least 3 characters')
    .isLength({ max: 100 })
    .withMessage('Product Name must be at most 100 characters'),

  body('description')
    .notEmpty()
    .withMessage('Product Description is required')
    .isLength({ min: 10 })
    .withMessage('Product Description must be at least 10 characters')
    .isLength({ max: 2000 })
    .withMessage('Product Description must be at most 2000 characters'),

  body('quantity')
    .notEmpty()
    .withMessage('Product quantity is required')
    .isNumeric({ min: 0 })
    .withMessage('Quantity must be a positive number'),

  body('sold')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Sold must be a positive number'),

  body('price')
    .notEmpty()
    .withMessage('Product Price is required')
    .isFloat({ min: 1, max: 100000 })
    .withMessage('Price must be between 1 and 100000'),

  body('priceAfterDiscount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price after discount must be a positive number'),

  body('discount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Discount must be a positive number')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Price must be between 0 and 100'),

  body('color')
    .optional()
    .isArray()
    .withMessage('Color must be a array of strings'),

  body('images')
    .optional()
    .isArray({ min: 1 })
    .withMessage('At least one product image is required'),

  body('images.*').isString().withMessage('Each image must be a string'),

  body('imageCover')
    .notEmpty()
    .isString()
    .withMessage('Cover image must be a string'),

  body('subCategory')
    .notEmpty()
    .withMessage('Product SubCategory is required')
    .isMongoId()
    .withMessage('Invalid SubCategory ID')
    .custom(async (value, { req }) => {
      const subCategory = await SubCategory.findById(value);
      if (!subCategory) {
        throw new Error('No SubCategory Id in subCategory collection');
      }
      return true;
    }),

  body('brand')
    .optional()
    .isMongoId()
    .withMessage('Invalid Brand ID')
    .custom(async (value, { req }) => {
      const brand = await Brand.findById(value);
      if (!brand) {
        throw new Error('No Brand Id in brand collection');
      }
      return true;
    }),

  body('ratingsAverage')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),

  body('ratingsQuantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Ratings Quantity must be a non-negative number'),

  validatorMiddleware,
];

exports.updateProductRequest = [
  param('id').isMongoId().withMessage('Invalid Product ID'),
  validatorMiddleware,
];

exports.validateProductByIdRequest = [
  param('id').isMongoId().withMessage('Invalid Product ID'),
  validatorMiddleware,
];
