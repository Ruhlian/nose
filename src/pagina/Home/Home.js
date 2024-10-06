// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import ProductCarousel from '../../componentes/ProductCarousel/ProductCarousel';
import Carousel from "../../componentes/Carousel/Carousel";
import Navbar from '../../componentes/Navbar/Navbar';
import CategoryContainer from '../../componentes/Category/Category';
import CartSide from '../../componentes/CartSide/CartSide'; // Ajusta la ruta si es necesario
import img1 from '../../assets/carrousel/1.jpg';
import img2 from '../../assets/images/main-img.jpg';
import img3 from '../../assets/carrousel/3.jpg';

const Home = () => {
    const [productos, setProductos] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [noResults, setNoResults] = useState(false);
    
    const navigate = useNavigate(); // Inicializa useNavigate
    const [cartOpen, setCartOpen] = useState(false);
    const toggleCart = () => {
        setCartOpen(prevState => !prevState);
    };
    
    useEffect(() => {
        axios.get('http://localhost:3001/productos')
            .then(response => {
                const productosData = response.data;
                setProductos(productosData);
                setFilteredProductos(productosData);
                const categoriasUnicas = [...new Set(productosData.map(producto => producto.categoria))];
                setCategorias(['Todos', ...categoriasUnicas]);
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error);
            });
    }, []);

    const handleProductClick = (product) => {
        // Redirigir a la página de detalles del producto
        navigate(`/ProductDetails/${product.id}`);
    };

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
    };

    const handleCategoryClick = (categoria) => {
        if (categoria === 'Todos') {
            setFilteredProductos(productos);
            setNoResults(false);
        } else {
            const productosFiltrados = productos.filter(producto => producto.categoria === categoria);
            setFilteredProductos(productosFiltrados);
            setNoResults(productosFiltrados.length === 0);
        }
        setMenuOpen(false);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
            const productosFiltrados = productos.filter(producto =>
                producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProductos(productosFiltrados);
            setNoResults(productosFiltrados.length === 0);
        } else {
            setFilteredProductos(productos);
            setNoResults(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const carouselImages = [img1, img2, img3];

    return (
        <div>
            <Carousel images={carouselImages} />
            <div className="main__section">
                <Navbar
                    categorias={categorias}
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                    handleSearch={handleSearch}
                    handleKeyPress={handleKeyPress}
                    menuOpen={menuOpen}
                    toggleMenu={toggleMenu}
                    handleCategoryClick={handleCategoryClick}
                />
                <CartSide isOpen={cartOpen} onClose={toggleCart} /> 
                <CategoryContainer handleCategoryClick={handleCategoryClick} />
                <ProductCarousel
                    filteredProductos={filteredProductos}
                    handleProductClick={handleProductClick}
                    noResults={noResults}
                />
            </div>
        </div>
    );
};

export default Home;
