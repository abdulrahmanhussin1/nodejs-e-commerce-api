const express = require('express');

const router = express.Router();

// Importing the subcategory request validator
const {
  validateSubCategoryByIdRequest,
  createSubCategoryRequest,
  updateSubCategoryRequest,
} = require('../../app/http/requests/subCategoryRequest');

// Importing the category controller and router
const {
  getSubCategories,
  createSubCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} = require('../../app/http/controllers/subCategoryController');

router
  .route('/')
  .get(getSubCategories)
  .post(createSubCategoryRequest, createSubCategory);

router
  .route('/:id')
  .get(validateSubCategoryByIdRequest, getSubCategoryById)
  .put(updateSubCategoryRequest, updateSubCategory)
  .delete(validateSubCategoryByIdRequest, deleteSubCategory);

module.exports = router;
