const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category');
const {protect} = require('../middleware/auth');
const upload = require('../middleware/upload');
const {hitCacheCategoryDetail, clearCacheCategoryDetail} = require('../middleware/redis');

router
  .get('/', protect, categoryController.getAllCategory)
  .get('/search:name', protect, categoryController.getNameCategory)
  .get('/:id', protect, hitCacheCategoryDetail, categoryController.getDetailCategory)
  .post('/', protect, upload.single('photo'), categoryController.createCategory)
  .put('/:id', protect, clearCacheCategoryDetail, upload.single('photo'), categoryController.updateCategory)
  .delete('/:id', protect, clearCacheCategoryDetail, categoryController.deleteCategory);

module.exports = router;
