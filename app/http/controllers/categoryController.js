const factory = require('../../services/generalCrudService');
const Category = require('../../models/category');

// @desc Get all categories
// @route GET /categories
// @access public
exports.getCategories = factory.getAll(Category);

// @desc Get a single category by slug
// @route categories/:id
// @access public
exports.getCategoryById = factory.getOne(Category);

// @desc Create a new category
// @route POST /categories
// @access private
exports.createCategory = factory.createOne(Category);
// @desc Update a specific category
// @route PUT /categories/:id
// @access private
exports.updateCategory = factory.updateOne(Category);

// @desc Delete a specific category
// @route DELETE /categories/:id
// @access private
exports.deleteCategory = factory.deleteOne(Category);
