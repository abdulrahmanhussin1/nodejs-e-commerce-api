const express = require('express');

const router = express.Router();

const {
  validateBrandByIdRequest,
  createBrandRequest,
  updateBrandRequest,
} = require('../../app/http/requests/brandRequest');

const {
  getBrands,
  createBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require('../../app/http/controllers/brandController');

router.route('/').get(getBrands).post(createBrandRequest, createBrand);

router
  .route('/:id')
  .get(validateBrandByIdRequest, getBrandById)
  .put(updateBrandRequest, updateBrand)
  .delete(validateBrandByIdRequest, deleteBrand);

module.exports = router;
