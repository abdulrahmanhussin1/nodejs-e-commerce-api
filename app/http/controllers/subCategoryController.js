const asyncHandler = require('express-async-handler');
const SubCategory = require('../../models/subCategory');
const exists = require('../../helpers/general');
const Category = require('../../models/category');
const ApiError = require('../../helpers/ApiError');

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.categoryId) {
    req.body.categoryId = req.params.categoryId;
  }
  next();
};

exports.createFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.categoryId) filterObj = { category: req.params.categoryId };
  req.filterObj = filterObj;
  next();
};
// @desc Get all subcategories
// @route GET /subcategories
// @access public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit || 15;
  const startIndex = (page - 1) * limit;
  const total = await SubCategory.countDocuments({});

  const categories = await SubCategory.find(req.filterObj)
    .skip(startIndex)
    .limit(limit)
    .populate('category', 'name')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: 'SubCategories retrieved successfully',
    total,
    page,
    data: categories,
  });
});

// @desc Get a single subcategory by slug
// @route GET /subcategories/:id
// @access public
exports.getSubCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subcategory = await SubCategory.findById(id).populate(
    'category',
    'name',
  );

  if (exists(res, subcategory, 'Subcategory', next)) return;

  res.status(200).json({
    success: true,
    message: 'Subcategory retrieved successfully',
    data: subcategory,
  });
});

// @desc Create a new subcategory
// @route POST /subcategories
// @access private
exports.createSubCategory = asyncHandler(async (req, res) => {
  //check if categoryId exists
  const categoryExists = await Category.findById(req.body.categoryId);
  if (!categoryExists) {
    throw new ApiError('Invalid categoryId', 400);
  }

  const subcategory = await SubCategory.create({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    category: req.body.categoryId,
  });

  res.status(201).json({
    success: true,
    message: 'Subcategory created successfully',
    data: subcategory,
  });
});

// @desc Update a specific subcategory
// @route PUT /subcategories/:id
// @access private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  //check if categoryId exists
  const categoryExists = await Category.findById(req.body.categoryId);
  if (!categoryExists) {
    throw new ApiError('Invalid categoryId', 400);
  }

  const { id } = req.params;
  const { name, description, categoryId, image } = req.body;

  const subcategory = await SubCategory.findByIdAndUpdate(
    id,
    {
      name,
      description,
      category: categoryId,
      image,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (exists(res, subcategory, 'Subcategory', next)) return;

  res.status(200).json({
    success: true,
    message: 'Subcategory updated successfully',
    data: subcategory,
  });
});

// @desc Delete a specific subcategory
// @route DELETE /:id
// @access private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubCategory.findByIdAndDelete(id);

  if (exists(res, subcategory, 'Subcategory', next)) return;

  res.status(200).json({
    success: true,
    message: 'Subcategory deleted successfully',
  });
});
