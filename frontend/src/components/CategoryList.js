import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, TableSortLabel, Typography, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import CategoryModal from './CategoryModal';
import Swal from 'sweetalert2';
import * as categoryService from './../services/categoryService';
import './css/CategoryList.css';

const CategoryList = ({ categories, onDelete, onEdit }) => {
    const [filter, setFilter] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [sortField, setSortField] = useState('amount');
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortedCategories, setSortedCategories] = useState([]);

    useEffect(() => {
        const filteredAndSortedCategories = categories
            .filter(filterCategory)
            .sort((a, b) => {
                let aValue = a[sortField];
                let bValue = b[sortField];

                if (sortField === 'amount') {
                    aValue = parseFloat(aValue);
                    bValue = parseFloat(bValue);
                }

                if (sortField === 'date') {
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
        setSortedCategories(filteredAndSortedCategories);
    }, [categories, sortField, sortDirection, filter]);

    const handleSort = (field) => {
        const isAsc = sortField === field && sortDirection === 'asc';
        setSortField(field);
        setSortDirection(isAsc ? 'desc' : 'asc');
    };

    const filterCategory = (category) => {
        const filterText = filter.toLowerCase();
        return (
            category.name.toString().toLowerCase().includes(filterText)
        );
    };

    const openEditModal = (category) => {
        setCurrentCategory(category);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentCategory(null);
    };

    const handleSave = (editedCategory) => {
        if (currentCategory) {
            categoryService.updateCategory(editedCategory.id, editedCategory)
                .then(response => {
                    console.log('Update response:', response);
                    const updatedSortedCategories = sortedCategories.map(category =>
                        category.id === editedCategory.id ? response.data : category
                    );
                    setSortedCategories(updatedSortedCategories);
                    closeEditModal();
                })
                .catch(error => console.error('Error updating category:', error));
        }
    };

    const handleDelete = (idx) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(idx, "idx")
                onDelete(idx);
                Swal.fire(
                    'Deleted!',
                    'Your category has been deleted.',
                    'success'
                )
            }
        });
    };

    return (
        <>
            <div className='category-search--container'>

                <TextField
                    label="Search"
                    variant="outlined"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
            </div>

            <TableContainer component={Paper}>
                <Table aria-label="category table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">
                                <TableSortLabel
                                    active={sortField === 'name'}
                                    direction={sortField === 'name' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('name')}
                                >
                                    Name
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
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedCategories.map((category, idx) => (
                            <TableRow key={idx}>
                                <TableCell align="left">
                                    {category.name}
                                </TableCell>
                                <TableCell align="left">
                                    {category.description}
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => openEditModal(category)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(category.id)}>
                                        <DeleteIcon />
                                    </IconButton>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {isEditModalOpen && (
                <CategoryModal
                    category={currentCategory}
                    onSave={handleSave}
                    onClose={closeEditModal}
                />
            )}
            {categories.length === 0 && (
                <Typography variant="subtitle1" style={{ margin: '20px' }}>
                    No category data
                </Typography>
            )}
        </>
    );
};

export default CategoryList;
