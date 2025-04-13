const asyncHandler = require('express-async-handler');
const exists = require('../../helpers/general');
const ApiError = require('../../helpers/ApiError');
const ApiFeatures = require('../../helpers/ApiFeatures');
const factory = require('../../services/generalCrudService');

const SubCategory = require('../../models/subCategory');
const Category = require('../../models/category');

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
  const documentCount = await SubCategory.countDocuments();
  const apiFeatures = new ApiFeatures(SubCategory.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .search()
    .paginate(documentCount);

  // Execute query
  const subCategories = await apiFeatures.mongooseQuery;

  res.status(200).json({
    success: true,
    message: 'SubCategories retrieved successfully',
    paginationResult: apiFeatures.paginationResult,
    data: subCategories,
  });
});

// @desc Get a single subcategory by slug
// @route GET /subcategories/:id
// @access public
exports.getSubCategoryById = factory.getOne(SubCategory);

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
exports.deleteSubCategory = factory.deleteOne(SubCategory);
