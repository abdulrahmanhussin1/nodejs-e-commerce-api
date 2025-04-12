const express = require('express');

const router = express.Router();

const {
  createProductRequest,
  updateProductRequest,
  validateProductByIdRequest,
} = require('../../app/http/requests/productRequest');

const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../../app/http/controllers/productController');

router.route('/').get(getProducts).post(createProductRequest, createProduct);

router
  .route('/:id')
  .get(validateProductByIdRequest, getProductById)
  .put(updateProductRequest, updateProduct)
  .delete(validateProductByIdRequest, deleteProduct);

module.exports = router;
