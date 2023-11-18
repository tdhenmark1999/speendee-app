const pool = require('../config/dbConfig');

class CategoryModel {
    async getAll() {
        const query = 'SELECT * FROM categories';
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    async add(category) {
        const { name, description } = category;
        const query = 'INSERT INTO categories(name, description) VALUES($1, $2) RETURNING *';
        const values = [name, description];

        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(id, category) {
        const { name, description } = category;
        const query = 'UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *';
        const values = [name, description, id];

        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        const query = 'DELETE FROM categories WHERE id = $1';
        try {
            await pool.query(query, [id]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CategoryModel();
