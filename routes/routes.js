const express = require('express');

const categoryRoute = require('./router/categoryRoute');
const subCategoryRoute = require('./router/subCategoryRoute');
const brandRoute = require('./router/brandRoute');

const router = express.Router();

// Use Routes
router.use('/categories', categoryRoute);
router.use('/subCategories', subCategoryRoute);
router.use('/brands', brandRoute);
module.exports = router;
