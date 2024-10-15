import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../../componentes/ProductForm/ProductForm';
import add from '../../assets/icons/add-azul.png';
import './ProductManage.css';

const ProductManage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/productos');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/productos/${id}`);
            setProducts(products.filter(product => product.id !== id)); // Actualizar estado local
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsEditing(true);
    };

    const handleAdd = () => {
        setSelectedProduct(null);
        setIsEditing(true);
    };

    const handleViewDetails = (product) => {
        alert(`Detalles del producto:\n\nNombre: ${product.nombre}\nPrecio: ${product.precio}\nStock: ${product.cantidad_disponible}\nCategoría: ${product.categoria}`);
    };

    const handleFormSubmit = async (formData) => {
        try {
            let response;
            if (selectedProduct) {
                // Editar producto existente
                response = await axios.put(`http://localhost:3001/productos/${selectedProduct.id}`, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                // Actualizar producto editado en el estado
                setProducts(products.map(product => product.id === selectedProduct.id ? response.data : product));
            } else {
                // Crear nuevo producto
                response = await axios.post('http://localhost:3001/productos', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                // Agregar nuevo producto al estado
                setProducts([...products, response.data]);
            }
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    return (
        <div className="product-manage">
            <div className='header-title__container'>
                <h1 className='manage-title'>Gestión de Productos</h1>
                <img onClick={handleAdd} className='add-icon__manage' src={add} alt='' />
            </div>
            {isEditing ? (
                <ProductForm
                    product={selectedProduct}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <div className='table-product__container'>
                    <table className='product-table'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Categoría</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.nombre}</td>
                                    <td>${product.precio}</td>
                                    <td>{product.cantidad_disponible}</td>
                                    <td>{product.categoria}</td>
                                    <td className="product-actions">
                                        <button onClick={() => handleEdit(product)} className='user-button edit'>Editar</button>
                                        <button onClick={() => handleDelete(product.id)} className='user-button delete'>Eliminar</button>
                                        <button onClick={() => handleViewDetails(product)} className='user-button details'>Ver Detalles</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProductManage;
