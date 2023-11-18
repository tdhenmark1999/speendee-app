import React, { useState, useEffect } from 'react';
import TransactionList from './../../components/TransactionList';
import TransactionModal from './../../components/TransactionModal';
import './style.css';
import * as transactionService from './../../services/transactionService';
import * as categoryService from './../../services/categoryService';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    useEffect(() => {
        transactionService.getAllTransactions()
            .then(response => setTransactions(response.data))
            .catch(error => console.error('Error fetching transactions:', error));

        categoryService.getAllCategories()
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, [transactions]);

    const handleSaveTransaction = (transaction) => {

        transactionService.addtransaction(transaction)
            .then(response => {
                const updatedTransactions = [...transactions, response.data];
                setTransactions(updatedTransactions);
                setShowModal(false);
            })
            .catch(error => console.error('Error adding transaction:', error));

    };


    const handleDelete = (id) => {
        transactionService.deletetransaction(id)
            .then(() => {
                setTransactions(prevTransactions => (
                    prevTransactions.filter(item => item.id !== id)
                ));
            })
            .catch(error => console.error('Error deleting transaction:', error));
    };

    const handleEdit = (item) => {
        setSelectedTransaction(item);
        setShowModal(true);
    };



    return (
        <div className='transaction-container'>
            <div className='wrapper'>
                <button className='btn-add' onClick={() => setShowModal(true)}>Add Transaction</button>
                <TransactionList transactions={transactions}
                    onDelete={handleDelete}
                    categories={categories}
                    onEdit={handleEdit} />
                {showModal && (
                    <TransactionModal
                        transaction={selectedTransaction}
                        categories={categories}
                        onSave={handleSaveTransaction}
                        onClose={() => {
                            setShowModal(false);
                            setSelectedTransaction(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Dashboard;
