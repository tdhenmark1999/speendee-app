import React, { useState, useEffect } from 'react';
import './css/CategoryModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const CategoryModal = ({ category, onSave, onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    const handleSave = () => {
        const newData = {
            name: name,
            description: description,
        };

        if (category?.id) {
            newData.id = category.id;
        }

        onSave(newData);
        onClose();
    }

    useEffect(() => {
        if (category) {
            setName(category.name || '');
            setDescription(category.description || '');
        } else {
            setName('');
            setDescription('');
        }
    }, [category]);

    useEffect(() => {
        setIsSaveDisabled(name.trim() === '' || description.trim() === '');
    }, [name, description]);

    return (
        <>
            <div className="modal-backdrop" onClick={onClose} />
            <div className="modal">
                <button className="modal-close-btn" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h2>{category ? 'Edit Category' : 'Add Category'}</h2>
                <div className='field-container'>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />
                    <textarea
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />
                </div>
                <div className="modal-buttons">
                    <button onClick={onClose}>Close</button>

                    <button onClick={handleSave} disabled={isSaveDisabled}>Save</button>
                </div>
            </div>
        </>
    );
};

export default CategoryModal;
