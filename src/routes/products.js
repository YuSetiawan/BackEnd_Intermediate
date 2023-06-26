const express = require('express');
const router = express.Router();
const productController = require('../controller/products');
const {protect, validateSeller} = require('../middleware/auth');
const upload = require('../middleware/upload');
const {hitCacheProductDetail, clearCacheProductDetail} = require('../middleware/redis');

router
  .get('/', protect, productController.getAllProduct)
  .get('/search', protect, productController.getNameProduct)
  .get('/:id', protect, hitCacheProductDetail, productController.getDetailProduct)
  .post('/', protect, validateSeller, upload.single('photo'), productController.createProduct)
  .put('/:id', protect, validateSeller, clearCacheProductDetail, upload.single('photo'), productController.updateProduct)
  .delete('/:id', protect, validateSeller, clearCacheProductDetail, productController.deleteProduct);

module.exports = router;
