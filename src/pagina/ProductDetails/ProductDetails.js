import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../componentes/Header/Header';
import Footer from '../../componentes/Footer/Footer';
import './ProductDetails.css';
import cart from '../../assets/icons/cart-white.png';
import { useCart } from '../../context/CartContext/CartContext';
import axios from 'axios';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [stock, setStock] = useState(0);
    const [selectedPresentation, setSelectedPresentation] = useState('');
    const { addToCart } = useCart();

    useEffect(() => {
        axios.get(`http://localhost:3001/productos/${id}`)
            .then(response => {
                const productoData = response.data;
                setProduct(productoData);
                setStock(productoData.cantidad_disponible);
                if (Object.keys(productoData.presentaciones).length > 0) {
                    setSelectedPresentation(Object.keys(productoData.presentaciones)[0]);
                }
            })
            .catch(error => {
                console.error('Error al obtener el producto:', error);
            });
    }, [id]);

    const handleQuantityChange = (e) => {
        const newQuantity = Number(e.target.value);
        setQuantity(Math.min(newQuantity, stock));
    };

    const handleAddToCart = () => {
        if (quantity <= stock) {
            addToCart(product, quantity);
        } else {
            alert('La cantidad solicitada supera el stock disponible.');
        }
    };

    const handlePresentationChange = (e) => {
        setSelectedPresentation(e.target.value);
    };

    if (!product) {
        return <p>Cargando producto...</p>;
    }

    return (
        <>
            <Header />
            <div className="product-details">
                <div className="product-details__image-container">
                    <img src={product.imagen} alt={product.nombre} className="product-details__image" />
                </div>
                <div className="product-details__info">
                    <p className='product-details__category'>{product.categoria} | {product.id}</p>
                    <h1 className="product-details__title">{product.nombre}</h1>
                    <p className='product-details__price'>${product.precio.toFixed(3)} COP</p>
                    <div className='product-details__presentaciones'>
                        <label htmlFor="presentations"></label>
                        <select
                            id="presentations"
                            value={selectedPresentation}
                            onChange={handlePresentationChange}
                            className='product-details__presentation'
                        >
                            {Object.entries(product.presentaciones).map(([key, value]) => (
                                <option key={key} value={key} className='product-details__options'>{value}</option>
                            ))}
                        </select>
                    </div>

                    <div className='product-stock__container'>
                        <p className='product-stock'>Cantidad en Stock: {stock}</p>
                    </div>
                    <div className='select-product__container'>
                        <div className="product-details__quantity">
                            <label htmlFor="quantity"></label>
                            <input
                                id="quantity"
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className='quantity-selection' />
                        </div>
                        <button className="product-details__add-to-cart" onClick={handleAddToCart}>
                            <img src={cart} alt='' className='add-to-cart'></img>Añadir al Carrito
                        </button>
                    </div>
                </div>
            </div>

            <div className='product-details__container'>
                <div className='product-information__container'>
                    <h3>Plagas controladas</h3>
                    <p className='product-details__plagas'>{product.plagas}</p>
                    <h3 className='dosis-title'>Dosis</h3>
                    {product.dosis && <p className='product-details__dosis'>{product.dosis}</p>}
                </div>

                <div className='product-description__container'>
                    <h3>Descripción</h3>
                    <p className='product-description'>{product.descripcion}</p>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ProductDetails;
