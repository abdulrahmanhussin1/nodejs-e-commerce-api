const asyncHandler = require('express-async-handler');
const exists = require('../../helpers/general');
const ApiFeatures = require('../../helpers/ApiFeatures');
const factory = require('../../services/generalCrudService');

const Brand = require('../../models/brand');

// @desc Get all Brands
// @route GET /Brands
// @access public
exports.getBrands = asyncHandler(async (req, res) => {
  const documentCount = await Brand.countDocuments();
  const apiFeatures = new ApiFeatures(Brand.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .search()
    .paginate(documentCount);

  // Execute query
  const brands = await apiFeatures.mongooseQuery;

  res.status(200).json({
    success: true,
    message: 'Brands retrieved successfully',
    paginationResult: apiFeatures.paginationResult,
    data: brands,
  });
});

// @desc Get a single Brand by slug
// @route Brands/:id
// @access public
exports.getBrandById = factory.getOne(Brand);

// @desc Create a new Brand
// @route POST /Brands
// @access private
exports.createBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.create({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  });

  res.status(201).json({
    success: true,
    message: 'Brand created successfully',
    data: brand,
  });
});
// @desc Update a specific Brand
// @route PUT /Brands/:id
// @access private
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndUpdate(
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

  if (exists(res, brand, 'Brand', next)) return;

  res.status(200).json({
    success: true,
    message: 'Brand updated successfully',
    data: brand,
  });
});

// @desc Delete a specific Brand
// @route DELETE /Brands/:id
// @access private
exports.deleteBrand = factory.deleteOne(Brand);
