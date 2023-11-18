import axios from 'axios';

const API_URL = 'http://localhost:3000/api/categories';

const getAllCategories = () => axios.get(API_URL);
const addCategory = (category) => axios.post(API_URL, category);
const updateCategory = (id, category) => axios.put(`${API_URL}/${id}`, category);
const deleteCategory = (id) => axios.delete(`${API_URL}/${id}`);

export { getAllCategories, addCategory, updateCategory, deleteCategory };