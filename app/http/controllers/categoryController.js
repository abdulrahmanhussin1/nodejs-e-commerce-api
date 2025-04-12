const asyncHandler = require('express-async-handler');
const Category = require('../../models/category');
const exists = require('../../helpers/general');

// @desc Get all categories
// @route GET /categories
// @access public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit || 15;
  const startIndex = (page - 1) * limit;
  const total = await Category.countDocuments({});

  const categories = await Category.find({})
    .skip(startIndex)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: 'Categories retrieved successfully',
    total,
    page,
    data: categories,
  });
});

// @desc Get a single category by slug
// @route categories/:id
// @access public
exports.getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (exists(res, category, 'Category', next)) return;

  res.status(200).json({
    success: true,
    message: 'Category retrieved successfully',
    data: category,
  });
});

// @desc Create a new category
// @route POST /categories
// @access private
exports.createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  });

  res.status(201).json({
    success: true,
    message: 'Category created successfully',
    data: category,
  });
});
// @desc Update a specific category
// @route PUT /categories/:id
// @access private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (exists(res, category, 'Category', next)) return;

  res.status(200).json({
    success: true,
    message: 'Category updated successfully',
    data: category,
  });
});

// @desc Delete a specific category
// @route DELETE /categories/:id
// @access private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);

  if (exists(res, category, 'Category', next)) return;

  res.status(200).json({
    success: true,
    message: 'Category deleted successfully',
  });
});
