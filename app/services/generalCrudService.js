const asyncHandler = require('express-async-handler');
const exists = require('../helpers/general');

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);

    if (exists(res, document, Model.modelName, next)) return;

    res.status(200).json({
      success: true,
      message: `${Model.modelName} retrieved successfully`,
      data: document,
    });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (exists(res, document, Model.modelName, next)) return;

    res.status(200).json({
      success: true,
      message: `${Model.modelName} deleted successfully`,
    });
  });
