const express = require('express');

const router = express.Router();

const {
  validateCategoryByIdRequest,
  createCategoryRequest,
  updateCategoryRequest,
} = require('../../app/http/requests/categoryRequest');

const {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../../app/http/controllers/categoryController');

// Subcategory routes
const subCategoryRoute = require('./subCategoryRoute');

router
  .route('/')
  .get(getCategories)
  .post(createCategoryRequest, createCategory);

router
  .route('/:id')
  .get(validateCategoryByIdRequest, getCategoryById)
  .put(updateCategoryRequest, updateCategory)
  .delete(validateCategoryByIdRequest, deleteCategory);

// Nested subcategory routes
router.use('/:categoryId/subCategories', subCategoryRoute);

module.exports = router;
