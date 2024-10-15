// src/components/ProductCarousel/ProductCarousel.js
import React, { useState } from 'react';
import './ProductCarousel.css'; // Asegúrate de ajustar la ruta según la ubicación del archivo CSS
import adelante from '../../assets/icons/flecha-adelante.png';
import atras from '../../assets/icons/flecha-atras.png';
import addCart from '../../assets/icons/add-cart.png';
import { useCart } from '../../context/CartContext/CartContext';

const ProductCarousel = ({ filteredProductos, handleProductClick, noResults }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4;
    const totalProducts = filteredProductos.length;
    const { addToCart } = useCart();

    // Inicializa el estado con la cantidad por defecto (1) para cada producto
    const [quantities, setQuantities] = useState(
        filteredProductos.reduce((acc, producto) => {
            acc[producto.id] = 1;
            return acc;
        }, {})
    );

    const handleNext = () => {
        if (currentIndex < totalProducts - itemsPerPage) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        } else {
            setCurrentIndex(totalProducts - itemsPerPage);
        }
    };

    const handleQuantityChange = (id, newQuantity, stock) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: Math.max(1, Math.min(newQuantity, stock)),
        }));
    };

    const handleAddToCart = (product) => {
        const selectedQuantity = quantities[product.id] || 1;
        if (selectedQuantity <= product.cantidad_disponible) {
            addToCart(product, selectedQuantity);
        } else {
            alert('La cantidad solicitada supera el stock disponible.');
        }
    };

    const handleInputChange = (id, value, stock) => {
        const newQuantity = parseInt(value, 10);
        if (!isNaN(newQuantity)) {
            handleQuantityChange(id, newQuantity, stock);
        }
    };

    return (
        <div className="product-carousel">
            {noResults ? (
                <p>No encontramos el producto :( ¡Intenta buscando palabras claves o categorías!</p>
            ) : (
                <>
                    <div className="carousel__products">
                        <div
                            className="carousel__products-wrapper"
                            style={{
                                transform: `translateX(-${(currentIndex / totalProducts) * 100}%)`,
                                transition: 'transform 0.5s ease-in-out',
                                width: `${(totalProducts * 100) / itemsPerPage}%`,
                            }}
                        >
                            {filteredProductos.map((producto) => (
                                <div
                                    key={producto.id}
                                    className="product"
                                    data-id={producto.id}
                                    onClick={() => handleProductClick(producto)}
                                >
                                    <img
                                        src={producto.imagen}
                                        alt={producto.nombre}
                                        className="product__image"
                                    />
                                    <div className="product-content__container">
                                        <h3 className="product__title">{producto.nombre}</h3>
                                        <h4 className="product-price">${producto.precio}</h4>
                                        <div className="add-to-cart-wrapper">
                                            <div className="quantity-control">
                                                <button
                                                    className="quantity-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleQuantityChange(producto.id, (quantities[producto.id] || 1) - 1, producto.cantidad_disponible);
                                                    }}
                                                >
                                                    –
                                                </button>
                                                <input
                                                    type="number"
                                                    value={quantities[producto.id] || 1}
                                                    onChange={(e) => {
                                                        e.stopPropagation();
                                                        handleInputChange(producto.id, e.target.value, producto.cantidad_disponible);
                                                    }}
                                                    className="quantity-input"
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                <button
                                                    className="quantity-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleQuantityChange(producto.id, (quantities[producto.id] || 1) + 1, producto.cantidad_disponible);
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                className="add-to-cart-button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddToCart(producto);
                                                }}
                                            >
                                                <img src={addCart} alt="carrito" className="cart-icon" />
                                            </button>
                                        </div>
                                        <p className="stock-info">Cantidad en stock: {producto.cantidad_disponible}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="carousel__button carousel__button--prev" onClick={handlePrev}>
                        <img src={atras} alt="" className="button-img" />
                    </button>
                    <button className="carousel__button carousel__button--next" onClick={handleNext}>
                        <img src={adelante} alt="" className="button-img" />
                    </button>
                </>
            )}
        </div>
    );
};

export default ProductCarousel;
