const Expense = require('../models/Expense');
const User = require('../models/User');
const { validateSplitMethod } = require('../utils/validation');

const addExpense = async (req, res) => {
    const { description, amount, splitMethod, splits } = req.body;
    try {
        if (!validateSplitMethod(splitMethod, splits, amount)) {
            return res.status(400).json({ message: 'Invalid split method' });
        }
        const newExpense = new Expense({ description, amount, splitMethod, splits });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ 'splits.user': req.params.userId });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().populate('splits.user', 'name email');
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const downloadBalanceSheet = async (req, res) => {
    // Implement file generation logic here
};
module.exports={
    addExpense,
    getUserExpenses,
    getAllExpenses,
    downloadBalanceSheet,
}