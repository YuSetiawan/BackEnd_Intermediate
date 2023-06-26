const express = require('express');
const router = express.Router();
const productRouter = require('../routes/products');
const categoryRouter = require('../routes/category');
const userRouter = require('../routes/user');
const transactionRouter = require('../routes/transaction');

router.use('/products', productRouter);
router.use('/category', categoryRouter);
router.use('/user', userRouter);
router.use('/transaction', transactionRouter);

module.exports = router;
