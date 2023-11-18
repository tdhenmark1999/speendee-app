const express = require('express');
const transactionsController = require('../controllers/transactionsController');
const router = express.Router();

router.get('/', transactionsController.getAllTransactions);
router.post('/', transactionsController.addTransaction);
router.put('/:id', transactionsController.updateTransaction);
router.delete('/:id', transactionsController.deleteTransaction);

module.exports = router;