import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductForm.css';

const ProductForm = ({ product, onSubmit, onCancel }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (product) {
            setName(product.nombre || '');
            setPrice(product.precio || '');
            setDescription(product.descripcion || '');
            setStock(product.cantidad_disponible || '');
            setCategory(product.categoria || '');
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedFields = {};
        if (name !== product.nombre) updatedFields.nombre = name;
        if (price !== product.precio) updatedFields.precio = price;
        if (description !== product.descripcion) updatedFields.descripcion = description;
        if (stock !== product.cantidad_disponible) updatedFields.cantidad_disponible = stock;
        if (category !== product.categoria) updatedFields.categoria = category;

        if (Object.keys(updatedFields).length === 0) {
            alert('No se realizaron cambios.');
            return;
        }

        try {
            let response;
            if (product && product.id) {
                // Editar producto existente
                response = await axios.patch(`http://localhost:3001/productos/${product.id}`, updatedFields, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                // Crear nuevo producto
                response = await axios.post('http://localhost:3001/productos', {
                    nombre: name,
                    precio: price,
                    descripcion: description,
                    cantidad_disponible: stock,
                    categoria: category
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
            console.log('Producto guardado:', response.data);
            // Llamar a la función de onSubmit después de guardar el producto
            onSubmit(response.data);
        } catch (error) {
            console.error('Error al guardar el producto:', error);
            // Manejo del error, como mostrar un mensaje al usuario
        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Precio:</label>
                <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Descripción:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>
            <div>
                <label>Stock:</label>
                <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Categoría:</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
            </div>
            <div className="form-actions">
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancel}>Cancelar</button>
            </div>
        </form>
    );
};

export default ProductForm;
