const express = require('express');

const categoryRoute = require('./router/categoryRoute');
const subCategoryRoute = require('./router/subCategoryRoute');

const router = express.Router();

// Use Routes
router.use('/categories', categoryRoute);
router.use('/subCategories', subCategoryRoute);

module.exports = router;
