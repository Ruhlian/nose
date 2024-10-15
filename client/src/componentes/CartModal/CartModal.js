import React, { useState, useEffect } from 'react';
import './CartModal.css';
import { useCart } from '../../context/CartContext/CartContext';
import { useAuth } from '../../context/AuthContext/AuthContext';
import axios from 'axios';

const CartModal = ({ isOpen, onClose }) => {
    const { cartItems, updateCartItemQuantity, removeFromCart, clearCart } = useCart();
    const { user } = useAuth();
    const [stock, setStock] = useState({});
    const [loading, setLoading] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const stockResponses = await Promise.all(
                    cartItems.map(item => axios.get(`http://localhost:3001/productos/${item.id}`))
                );
                const stockData = stockResponses.reduce((acc, response) => {
                    acc[response.data.id] = response.data.cantidad_disponible;
                    return acc;
                }, {});
                setStock(stockData);
            } catch (error) {
                console.error('Error al obtener el stock:', error);
            }
        };

        fetchStock();
    }, [cartItems]);

    const handleClose = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
            onClose();
        }, 200);
    };

    const handleQuantityChange = (id, quantity) => {
        const availableStock = stock[id] || 0;
        if (quantity >= 1 && quantity <= availableStock) {
            updateCartItemQuantity(id, quantity);
        }
    };

    const handleRemoveItem = (id) => {
        removeFromCart(id);
    };

    const handleCheckout = async () => {
        if (!user) {
            alert('Debes iniciar sesión para realizar una compra.');
            return;
        }

        setLoading(true);
        try {
            const now = new Date();
            const saleData = {
                fecha: now.toISOString(),
                cliente: `${user.nombre} ${user.apellido}`,
                correo: user.correo,
                total: subtotal,
                estado: 'Pendiente',
                items: cartItems.map(item => ({
                    producto_id: item.id,
                    nombre_producto: item.nombre,
                    cantidad: item.quantity,
                    precio_unitario: item.precio
                }))
            };

            await axios.post('http://localhost:3001/ventas', saleData);
            clearCart();
            handleClose();
        } catch (error) {
            console.error('Error al generar la venta:', error);
        } finally {
            setLoading(false);
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={`modal ${isOpen ? 'show' : ''} ${isAnimating ? 'close-animation' : 'open-animation'}`} onClick={handleClose}>
            <div className={`modal__content ${isAnimating ? 'close' : ''}`} onClick={handleModalClick}>
                <div className="cart__header">
                    <h3 className='cart__articles'>Artículos: {totalItems}</h3>
                    <button className="cart__clear" onClick={clearCart}>Vaciar Carrito</button>
                </div>
                {cartItems.length > 0 ? (
                    <>
                        <ul className="cart__list">
                            {cartItems.map((item) => (
                                <li key={item.id} className="cart__item">
                                    <img src={item.imagen} alt={item.nombre} className="cart__image" />
                                    <div className="cart__details">
                                        <h3 className="cart__name">{item.nombre}</h3>
                                        <p className="cart-price">${item.precio.toFixed(3)}</p>
                                        <div className="cart__quantity">
                                            <label>Cantidad:</label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                            />
                                        </div>
                                        <button className="cart__remove" onClick={() => handleRemoveItem(item.id)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="cart__subtotal">
                            <h3>Subtotal: ${subtotal.toFixed(3)}</h3>
                        </div>
                        <button
                            className="cart__checkout"
                            onClick={handleCheckout}
                            disabled={loading}
                        >
                            {loading ? 'Generando venta...' : 'Generar Venta'}
                        </button>
                    </>
                ) : (
                    <p>El carrito está vacío.</p>
                )}
            </div>
        </div>
    );
};

export default CartModal;
