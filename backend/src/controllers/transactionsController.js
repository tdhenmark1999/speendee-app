const TransactionModel = require('../models/transactionModel');

exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await TransactionModel.getAll();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addTransaction = async (req, res) => {
    try {
        const newTransaction = await TransactionModel.add(req.body);
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTransaction = await TransactionModel.update(id, req.body);
        if (updatedTransaction) {
            res.status(200).json(updatedTransaction);
        } else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        await TransactionModel.delete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
