import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './HeaderManage.css';
import logo from '../../assets/images/logo-azul.png';
import menu from '../../assets/icons/menu-azul.png';

const HeaderManage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef(null);
  const menuIconRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      !menuIconRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false); // Cierra el sidebar cuando la ubicación cambia
  }, [location]);

  return (
    <header className="header">
      <div className="header-manage__container">
        <img
          src={menu}
          alt="menu-icon"
          className="header__menu-icon"
          onClick={toggleMenu}
          ref={menuIconRef}
        />
        <img src={logo} alt="Logo" className="header__logo" />
      </div>
      <nav className={`sidebar ${isOpen ? 'open' : ''}`} ref={sidebarRef}>
        <ul>
          <li className={location.pathname === '/ProductManage' ? 'active' : ''}>
            <Link to="/ProductManage" className='sidebar-titles'>Gestión de Productos</Link>
          </li>
          <li className={location.pathname === '/UserManage' ? 'active' : ''}>
            <Link to="/UserManage" className='sidebar-titles'>Gestión de Usuarios</Link>
          </li>
          <li className={location.pathname === '/SalesManagement' ? 'active' : ''}>
            <Link to="/SalesManagement" className='sidebar-titles'>Gestión de Ventas</Link>
          </li>
          <li className={location.pathname === '/Home' ? 'active' : ''}>
            <Link to="/Home" className='sidebar-titles'>Inicio</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderManage;
