const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transaction');
const {protect} = require('../middleware/auth');

router
  .get('/', protect, transactionController.getAllTransaction)
  .get('/:id', protect, transactionController.getDetailTransaction)
  .post('/', protect, transactionController.createTransaction)
  .put('/:id', protect, transactionController.updateTransaction)
  .delete('/:id', protect, transactionController.deleteTransaction);

module.exports = router;
