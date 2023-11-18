import axios from 'axios';

const API_URL = 'http://localhost:3000/api/transactions';

const getAllTransactions = () => axios.get(API_URL);
const addtransaction = (transaction) => axios.post(API_URL, transaction);
const updatetransaction = (id, transaction) => axios.put(`${API_URL}/${id}`, transaction);
const deletetransaction = (id) => axios.delete(`${API_URL}/${id}`);

export { getAllTransactions, addtransaction, updatetransaction, deletetransaction };