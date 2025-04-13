const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const exists = require('../../helpers/general');
const ApiFeatures = require('../../helpers/ApiFeatures');
const factory = require('../../services/generalCrudService');

const Product = require('../../models/product');

// @desc Get all products
// @route GET /products
// @access public

exports.getProducts = asyncHandler(async (req, res) => {
  const documentCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .search()
    .paginate(documentCount);

  // Execute query
  const products = await apiFeatures.mongooseQuery;

  res.status(200).json({
    success: true,
    message: 'Products retrieved successfully',
    paginationResult: apiFeatures.paginationResult,
    data: products,
  });
});

// @desc Get a single product by slug
// @route products/:id
// @access public
exports.getProductById = factory.getOne(Product);

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
exports.deleteProduct = factory.deleteOne(Product);
