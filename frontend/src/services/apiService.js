import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchTransactions = () => {
    return axios.get(`${API_BASE_URL}/transactions`)
        .then(response => response.data)
        .catch(error => console.error('Error fetching transactions:', error));
};

export const fetchCategories = () => {
    return axios.get(`${API_BASE_URL}/categories`)
        .then(response => response.data)
        .catch(error => console.error('Error fetching categories:', error));
};
