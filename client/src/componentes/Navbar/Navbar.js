// src/componentes/Navbar/Navbar.js
import React, { useRef} from 'react';
import './Navbar.css'; // Asegúrate de tener el archivo CSS correspondiente
import menu from '../../assets/icons/menu-azul.png';
import search from '../../assets/icons/search-azul.png';

const Navbar = ({ categorias, searchTerm, handleSearchChange, handleSearch, handleKeyPress, menuOpen, toggleMenu, handleCategoryClick }) => {
    const menuRef = useRef(null);

    return (
        <nav className="navbar">
            <div className="navbar__box">
                {/* <img
                    src={menu}
                    className="menu-icon"
                    alt="menu-icon"
                    onClick={toggleMenu}
                    title="Menu de Categorias"
                /> */}
                <input
                    type="text"
                    className="nav__search-bar"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyPress}
                />
                <img
                    src={search}
                    alt="search-icon"
                    className="search-icon"
                    onClick={handleSearch}
                    title="Buscar"
                />
            </div>
            {menuOpen && (
                <div className="dropdown-menu" ref={menuRef}>
                    {categorias.map((categoria, index) => (
                        <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => handleCategoryClick(categoria)}
                        >
                            {categoria}
                        </div>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
