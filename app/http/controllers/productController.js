const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const exists = require('../../helpers/general');
const Product = require('../../models/product');

// @desc Get all products
// @route GET /products
// @access public

exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit || 15;
  const startIndex = (page - 1) * limit;
  const total = await Product.countDocuments({});

  const products = await Product.find({})
    .skip(startIndex)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: 'Products retrieved successfully',
    total,
    page,
    data: products,
  });
});

// @desc Get a single product by slug
// @route products/:id
// @access public
exports.getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (exists(res, product, 'Product', next)) return;

  res.status(200).json({
    success: true,
    message: 'Product retrieved successfully',
    data: product,
  });
});

// @desc Create a new product
// @route POST /products
// @access private
exports.createProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: product,
  });
});

// @desc Update a product
// @route PUT /products/:id
// @access private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  req.body.slug = slugify(req.body.name);
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (exists(res, product, 'Product', next)) return;
  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: product,
  });
});

// @desc Delete a product
// @route DELETE /products/:id
// @access private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (exists(res, product, 'Product', next)) return;

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
    data: {},
  });
});
