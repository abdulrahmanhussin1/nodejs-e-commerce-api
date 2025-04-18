const factory = require('../../services/generalCrudService');
const Product = require('../../models/product');

// @desc Get all products
// @route GET /products
// @access public

exports.getProducts = factory.getAll(Product);

// @desc Get a single product by slug
// @route products/:id
// @access public
exports.getProductById = factory.getOne(Product);

// @desc Create a new product
// @route POST /products
// @access private
exports.createProduct = factory.createOne(Product);

// @desc Update a product
// @route PUT /products/:id
// @access private
exports.updateProduct = factory.updateOne(Product);

// @desc Delete a product
// @route DELETE /products/:id
// @access private
exports.deleteProduct = factory.deleteOne(Product);
