const express = require('express');

const router = express.Router({ mergeParams: true });

const subCategoryRoute = require('./subCategoryRoute');

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

router
  .route('/')
  .get(getCategories)
  .post(createCategoryRequest, createCategory);

router
  .route('/:id')
  .get(validateCategoryByIdRequest, getCategoryById)
  .put(updateCategoryRequest, updateCategory)
  .delete(validateCategoryByIdRequest, deleteCategory);

router.use('/:categoryId/subCategories', subCategoryRoute);

module.exports = router;
