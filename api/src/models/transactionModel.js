const pool = require('../config/dbConfig');

class TransactionModel {
    async getAll() {
        const query = 'SELECT * FROM transactions';
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    async add(transaction) {
        const { category_id, amount, description, transaction_date } = transaction;
        const query = 'INSERT INTO transactions(category_id, amount, description, transaction_date) VALUES($1, $2, $3, $4) RETURNING *';
        const values = [category_id, amount, description, transaction_date];

        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(id, transaction) {
        const { category_id, amount, description, transaction_date } = transaction;
        const query = 'UPDATE transactions SET category_id = $1, amount = $2, description = $3, transaction_date = $4 WHERE id = $5 RETURNING *';
        const values = [category_id, amount, description, transaction_date, id];

        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        const query = 'DELETE FROM transactions WHERE id = $1';
        try {
            await pool.query(query, [id]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TransactionModel();
