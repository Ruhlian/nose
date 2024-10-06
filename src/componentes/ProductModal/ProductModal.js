// ProductModal.js

import React, { useState, useEffect } from 'react';
import './ProductModal.css';
import axios from 'axios';

const ProductModal = ({ product, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [stock, setStock] = useState(product.cantidad_disponible);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        // Obtén el stock real desde la API cuando el producto cambie
        axios.get(`http://localhost:3001/productos/${product.id}`)
            .then(response => {
                setStock(response.data.cantidad_disponible);
            })
            .catch(error => {
                console.error('Error al obtener el stock:', error);
            });
    }, [product]);

    const handleQuantityChange = (e) => {
        const newQuantity = Number(e.target.value);
        // Limita la cantidad a la cantidad en stock
        setQuantity(Math.min(newQuantity, stock));
    };

    const handleAddToCart = () => {
        onAddToCart(product, quantity);
        handleClose(); // Cierra la modal después de agregar al carrito
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 500); // Debe coincidir con la duración de la animación
    };

    return (
        <div className={`product-modal ${isClosing ? 'product-modal--closing' : 'product-modal--open'}`}>
            <div className="product-modal__content">
                <span className="modal__close" onClick={handleClose}>&times;</span>
                <a href='/ProductAplication' className='aplication-link'>¿Información sobre la aplicación del producto?</a>
                <img src={product.imagen} alt={product.nombre} className="product-modal__image" />
                <div className='product-modal-content__container'>
                    <h2 className="product-modal__title">{product.nombre}</h2>
                    <p>{product.descripcion}</p>
                    <p className='product-stock'>Cantidad en Stock: {stock}</p>
                    <p className='product-modal-price'>${product.precio}</p>
                    <div className='select-product__container'>
                        <div className="modal__quantity">
                            <label htmlFor="quantity">Cantidad:</label>
                            <input
                                id="quantity"
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={handleQuantityChange}
                            />
                        </div>
                        <button className="modal__add-to-cart" onClick={handleAddToCart} title='Añade al carrito'>Añadir al Carrito</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
