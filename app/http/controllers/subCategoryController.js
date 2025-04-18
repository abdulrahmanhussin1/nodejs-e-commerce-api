const factory = require('../../services/generalCrudService');
const SubCategory = require('../../models/subCategory');

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
exports.getSubCategories = factory.getAll(SubCategory);
// @desc Get a single subcategory by slug
// @route GET /subcategories/:id
// @access public
exports.getSubCategoryById = factory.getOne(SubCategory);

// @desc Create a new subcategory
// @route POST /subcategories
// @access private
exports.createSubCategory = factory.createOne(SubCategory);

// @desc Update a specific subcategory
// @route PUT /subcategories/:id
// @access private
exports.updateSubCategory = factory.updateOne(SubCategory);

// @desc Delete a specific subcategory
// @route DELETE /:id
// @access private
exports.deleteSubCategory = factory.deleteOne(SubCategory);
