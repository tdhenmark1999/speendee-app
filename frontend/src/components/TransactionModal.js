import React, { useState, useEffect } from 'react';
import './css/TransactionModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const TransactionModal = ({ transaction, onSave, onClose, categories }) => {
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    const handleSave = () => {
        const newData = {
            amount: amount,
            transaction_date: date,
            description: description,
            category_id: selectedCategory
        };

        if (transaction?.id) {
            newData.id = transaction.id;
        }

        onSave(newData);
        onClose();
    }


    useEffect(() => {
        if (transaction) {
            setAmount(transaction.amount || '');
            const transactionDate = new Date(transaction.transaction_date);
            const formattedDate = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}-${String(transactionDate.getDate()).padStart(2, '0')}`;
            setDate(formattedDate);
            setDescription(transaction.description || '');
            setSelectedCategory(transaction.category_id || '');
        } else {
            setAmount('');
            setDate('');
            setDescription('');
            setSelectedCategory('');
        }
    }, [transaction]);


    useEffect(() => {
        setIsSaveDisabled(amount.trim() === '' || description.trim() === '' || date.trim() === '' || selectedCategory === '');
    }, [amount, description, date, selectedCategory]);



    return (
        <>
            <div className="modal-backdrop" onClick={onClose} />
            <div className="modal">
                <button className="modal-close-btn" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h2>{transaction ? 'Edit Transaction' : 'Add Transaction'}</h2>

                <div className='field-container'>

                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" />
                    <textarea
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />


                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} placeholder="Category">
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="modal-buttons">

                    <button onClick={onClose}>Close</button>
                    <button onClick={handleSave} disabled={isSaveDisabled}>Save</button>

                </div>
            </div>
        </>

    );
};

export default TransactionModal;
