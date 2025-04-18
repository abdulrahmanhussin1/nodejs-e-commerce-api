const factory = require('../../services/generalCrudService');
const Brand = require('../../models/brand');

// @desc Get all Brands
// @route GET /Brands
// @access public
exports.getBrands = factory.getAll(Brand);

// @desc Get a single Brand by slug
// @route Brands/:id
// @access public
exports.getBrandById = factory.getOne(Brand);

// @desc Create a new Brand
// @route POST /Brands
// @access private
exports.createBrand = factory.createOne(Brand);
// @desc Update a specific Brand
// @route PUT /Brands/:id
// @access private
exports.updateBrand = factory.updateOne(Brand);

// @desc Delete a specific Brand
// @route DELETE /Brands/:id
// @access private
exports.deleteBrand = factory.deleteOne(Brand);
