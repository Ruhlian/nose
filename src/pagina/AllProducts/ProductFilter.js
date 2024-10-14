import React, { useState } from 'react';
import './ProductFilter.css'; // Asegúrate de que este archivo exista

const ProductFilter = ({ onFilterChange }) => {
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        onFilterChange(selectedCategory, priceRange);
    };

    const handlePriceRangeChange = (e) => {
        const selectedPriceRange = e.target.value;
        setPriceRange(selectedPriceRange);
        onFilterChange(category, selectedPriceRange);
    };

    return (
        <div className="product-filter">
            <h3>Filtrar Productos</h3>
            <div>
                <label>Categoria:</label>
                <select value={category} onChange={handleCategoryChange}>
                    <option value="">Todas</option>
                    <option value="Insectos">Insectos</option>
                    <option value="Roedores">Roedores</option>
                    <option value="Otros">Otros</option>
                </select>
            </div>
            <div>
                <label>Rango de Precio:</label>
                <select value={priceRange} onChange={handlePriceRangeChange}>
                    <option value="">Todos</option>
                    <option value="0-100">0 - 100</option>
                    <option value="101-500">101 - 500</option>
                    <option value="501-1000">501 - 1000</option>
                </select>
            </div>
        </div>
    );
};

export default ProductFilter;
