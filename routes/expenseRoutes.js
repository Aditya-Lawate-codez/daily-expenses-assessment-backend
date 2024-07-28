const express = require('express');
const { addExpense, getUserExpenses, getAllExpenses, downloadBalanceSheet } = require('../controllers/expenseController');

const router = express.Router();

router.post('/', addExpense);
router.get('/user/:userId', getUserExpenses);
router.get('/', getAllExpenses);
router.get('/download', downloadBalanceSheet);

module.exports = router;
