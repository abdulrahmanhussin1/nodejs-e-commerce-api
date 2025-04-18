const asyncHandler = require('express-async-handler');
const exists = require('../helpers/general');
const ApiFeatures = require('../helpers/ApiFeatures');

exports.getAll = (Model) =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    const documentCount = await Model.countDocuments(filter);
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .search()
      .paginate(documentCount);

    // Execute query
    const newDocument = await apiFeatures.mongooseQuery;

    res.status(200).json({
      success: true,
      message: `${Model.modelName}s retrieved successfully`,
      paginationResult: apiFeatures.paginationResult,
      data: newDocument,
    });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const newDocument = await Model.findById(id);

    if (exists(res, newDocument, Model.modelName, next)) return;

    res.status(200).json({
      success: true,
      message: `${Model.modelName} retrieved successfully`,
      data: newDocument,
    });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDocument = await Model.create({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
    });

    res.status(201).json({
      success: true,
      message: `${Model.modelName} created successfully`,
      data: newDocument,
    });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const newDocument = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (exists(res, newDocument, Model.modelName, next)) return;

    res.status(200).json({
      success: true,
      message: `${Model.modelName} updated successfully`,
      data: newDocument,
    });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const newDocument = await Model.findByIdAndDelete(id);

    if (exists(res, newDocument, Model.modelName, next)) return;

    res.status(200).json({
      success: true,
      message: `${Model.modelName} deleted successfully`,
    });
  });
