const asyncHandler = require('express-async-handler');
const exists = require('../../helpers/general');
const ApiFeatures = require('../../helpers/ApiFeatures');
const factory = require('../../services/generalCrudService');
const Category = require('../../models/category');

// @desc Get all categories
// @route GET /categories
// @access public
exports.getCategories = asyncHandler(async (req, res) => {
  const documentCount = await Category.countDocuments();
  const apiFeatures = new ApiFeatures(Category.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .search()
    .paginate(documentCount);

  // Execute query
  const categories = await apiFeatures.mongooseQuery;

  res.status(200).json({
    success: true,
    message: 'Categories retrieved successfully',
    paginationResult: apiFeatures.paginationResult,
    data: categories,
  });
});

// @desc Get a single category by slug
// @route categories/:id
// @access public
exports.getCategoryById = factory.getOne(Category);

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
exports.deleteCategory = factory.deleteOne(Category);
