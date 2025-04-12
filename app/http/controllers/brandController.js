const asyncHandler = require('express-async-handler');
const Brand = require('../../models/brand');
const exists = require('../../helpers/general');

// @desc Get all Brands
// @route GET /Brands
// @access public
exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit || 15;
  const startIndex = (page - 1) * limit;
  const total = await Brand.countDocuments({});

  const brands = await Brand.find({})
    .skip(startIndex)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: 'Brands retrieved successfully',
    total,
    page,
    data: brands,
  });
});

// @desc Get a single Brand by slug
// @route Brands/:id
// @access public
exports.getBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);

  if (exists(res, brand, 'Brand', next)) return;

  res.status(200).json({
    success: true,
    message: 'Brand retrieved successfully',
    data: brand,
  });
});

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
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);

  if (exists(res, brand, 'Brand', next)) return;

  res.status(200).json({
    success: true,
    message: 'Brand deleted successfully',
  });
});
