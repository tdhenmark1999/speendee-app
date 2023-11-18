import React, { useState, useEffect } from 'react';
import * as categoryService from './../../services/categoryService';
import CategoryList from './../../components/CategoryList';
import CategoryModal from './../../components/CategoryModal';
import './style.css';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null); // For editing

    useEffect(() => {
        categoryService.getAllCategories()
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleSaveUpdateCategory = (newCategoryData) => {

        categoryService.addCategory(newCategoryData)
            .then(response => {
                setCategories(prevCategories => [...prevCategories, response.data]);
                setShowModal(false); // Close the modal
            })
            .catch(error => console.error('Error adding category:', error));

    };

    const handleDelete = (id) => {
        categoryService.deleteCategory(id)
            .then(() => {
                const newCategories = categories.filter(category => category.id !== id);
                setCategories(newCategories);
            })
            .catch(error => console.error('Error deleting category:', error));
    };

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setShowModal(true);
    };

    return (
        <div className='category-container'>
            <div className='wrapper'>
                <button className='btn-add' onClick={() => setShowModal(true)}>Add Category</button>

                <CategoryList categories={categories}
                    onDelete={handleDelete}
                    onEdit={handleEdit} />
                {showModal && (
                    <CategoryModal
                        category={selectedCategory}
                        onSave={handleSaveUpdateCategory}
                        onClose={() => {
                            setShowModal(false);
                            setSelectedCategory(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Category;
