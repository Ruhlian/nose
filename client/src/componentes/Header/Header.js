// Header.js
import React, { useState } from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo1.png';
import cart from '../../assets/icons/cart.png';
import account from '../../assets/icons/account.png';
import CartModal from '../CartModal/CartModal';
import AccountModal from '../AccountModal/AccountModal';

const Header = () => {
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
    const location = useLocation();
    const path = location.pathname;

    const closeModals = () => {
        setIsCartModalOpen(false);
        setIsAccountModalOpen(false);
    };

    const toggleCartModal = () => {
        setIsAnimating(true);
        if (isCartModalOpen) {
            setTimeout(() => {
                setIsCartModalOpen(false);
                setTimeout(() => {
                    setIsHeaderExpanded(false);
                    setIsAnimating(false);
                }, 100);
            }, 150);
        } else {
            closeModals(); // Cierra la otra modal si está abierta
            setIsHeaderExpanded(true);
            setTimeout(() => {
                setIsCartModalOpen(true);
                setIsAnimating(false);
            }, 50);
        }
    };

    const toggleAccountModal = () => {
        setIsAnimating(true);
        if (isAccountModalOpen) {
            setTimeout(() => {
                setIsAccountModalOpen(false);
                setTimeout(() => {
                    setIsHeaderExpanded(false);
                    setIsAnimating(false);
                }, 100);
            }, 150);
        } else {
            closeModals(); // Cierra la otra modal si está abierta
            setIsHeaderExpanded(true);
            setTimeout(() => {
                setIsAccountModalOpen(true);
                setIsAnimating(false);
            }, 50);
        }
    };

    return (
        <header className="header">
            <div className="header__container">
                <div className='logo-header__container'>
                    <Link to={"/"}><img src={logo} alt="Logo" className="header__logo" /></Link>
                </div>

                <div className='navigation-header__container'>
                    <div className={`sections-header__container ${isHeaderExpanded ? 'expanded' : ''}`}>
                        <Link to={"/Nosotros"} className={path === "/Nosotros" ? "active" : ""}>NOSOTROS</Link>
                        <Link to={"/Productos"} className={path === "/Productos" ? "active" : ""}>PRODUCTOS</Link>
                        <Link to={"/Contacto"} className={path === "/Contacto" ? "active" : ""}>CONTÁCTENOS</Link>
                    </div>

                    <div className={`icons-header__container ${isHeaderExpanded ? 'expanded' : ''}`}>
                        <ul className="header__list">
                            <li className="header__element">
                                <img src={cart} alt="Carrito" className="cart" onClick={toggleCartModal} />
                            </li>
                            <li className="header__element">
                                <img src={account} alt='Cuenta' className='account' onClick={toggleAccountModal} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <CartModal isOpen={isCartModalOpen} onClose={toggleCartModal} />
            <AccountModal isOpen={isAccountModalOpen} onClose={toggleAccountModal} />
        </header>
    );
}

export default Header;
