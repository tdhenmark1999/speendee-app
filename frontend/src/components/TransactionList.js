import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, Typography, TableRow, Paper, TextField, TableSortLabel, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import TransactionModal from './TransactionModal';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import * as transactionService from './../services/transactionService';
import dateFormat from 'dateformat';
import './css/TransactionList.css';

const TransactionList = ({ transactions, categories, onDelete, onEdit }) => {
    const [filter, setFilter] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState(null);
    const [sortField, setSortField] = useState('amount');
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortedTransactions, setSortedTransactions] = useState([]);

    const handleSort = (field) => {
        const isAsc = sortField === field && sortDirection === 'asc';
        setSortField(field);
        setSortDirection(isAsc ? 'desc' : 'asc');
    };

    const filterTransaction = (transaction) => {
        const filterText = filter.toLowerCase();
        const formattedDate = dateFormat(transaction.transaction_date, 'yyyy-mm-dd').toLowerCase();
        return (
            transaction.amount && transaction.amount.toString().toLowerCase().includes(filterText) ||
            formattedDate.includes(filterText) ||
            transaction.description && transaction.description.toLowerCase().includes(filterText) ||
            transaction.category && transaction.category.toLowerCase().includes(filterText)
        );
    };

    const openEditModal = (transaction) => {
        console.log(transaction, "transaction")
        setCurrentTransaction(transaction);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentTransaction(null);
    };


    const handleSave = (editedTransaction) => {
        if (currentTransaction) {
            transactionService.updatetransaction(editedTransaction.id, editedTransaction)
                .then(response => {
                    console.log('Update response:', response);
                    const sort = sortedTransactions.map(category =>
                        category.id === editedTransaction.id ? response.data : category
                    );
                    setSortedTransactions(sort);
                    closeEditModal();
                })
                .catch(error => console.error('Error updating category:', error));
        }
    };

    const handleDelete = (idx) => {
        Swal.fire({
            title: 'Delete Transaction',
            text: 'Are you sure you want to delete this transaction?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(idx);
                Swal.fire(
                    'Deleted!',
                    'Your transaction has been deleted.',
                    'success'
                );
            }
        });
    };


    useEffect(() => {
        console.log("transactions:", transactions);
        const filteredAndSortedTransaction = transactions
            .filter(filterTransaction)
            .sort((a, b) => {
                let aValue = a[sortField];
                let bValue = b[sortField];

                // If sorting by 'amount' and it's a number, convert string to number
                if (sortField === 'amount') {
                    aValue = parseFloat(aValue);
                    bValue = parseFloat(bValue);
                }

                // If sorting by 'date', parse dates
                if (sortField === 'transaction_date') {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                }

                if (aValue < bValue) {
                    return sortDirection === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortDirection === 'asc' ? 1 : -1;
                }
                return 0;
            });
        console.log("filteredAndSortedTransaction:", filteredAndSortedTransaction);
        setSortedTransactions(filteredAndSortedTransaction);
    }, [categories, sortField, sortDirection, filter]);


    return (
        <>
            <div className='transaction-search--container'>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="transaction table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">
                                <TableSortLabel
                                    active={sortField === 'amount'}
                                    direction={sortField === 'amount' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('amount')}
                                >
                                    Amount
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="left">
                                <TableSortLabel
                                    active={sortField === 'transaction_date'}
                                    direction={sortField === 'transaction_date' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('transaction_date')}
                                >
                                    Date
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="left">
                                <TableSortLabel
                                    active={sortField === 'description'}
                                    direction={sortField === 'description' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('description')}
                                >
                                    Description
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="left">
                                <TableSortLabel
                                    active={sortField === 'category_id'}
                                    direction={sortField === 'category_id' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('category_id')}
                                >
                                    Category
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedTransactions.map((item, idx) => (
                            <TableRow key={idx}>
                                <TableCell align="left">
                                    PHP {item.amount}
                                </TableCell>

                                <TableCell align="left">
                                    {dateFormat(item.transaction_date, 'yyyy-mm-dd')}
                                </TableCell>
                                <TableCell align="left">{item.description}</TableCell>
                                <TableCell align="left">
                                    {categories.find(category => category.id === item.category_id)?.name || ''}
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => openEditModal(item)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(item.id)}>
                                        <DeleteIcon />
                                    </IconButton>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {isEditModalOpen && (
                <TransactionModal
                    transaction={currentTransaction}
                    onSave={handleSave}
                    onClose={closeEditModal}
                    categories={categories}

                />
            )}

            {transactions.length === 0 && (
                <Typography variant="subtitle1" style={{ margin: '20px' }}>
                    No transaction data
                </Typography>
            )}

        </>
    );
};

export default TransactionList;
