import React, { useEffect, useState } from 'react';
import './AllProducts.css';
import Header from '../../componentes/Header/Header';
import Footer from '../../componentes/Footer/Footer';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext/CartContext';

const AllProducts = () => {
    const [productos, setProductos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [precioSeleccionado, setPrecioSeleccionado] = useState('');
    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');
    const { addToCart } = useCart();

    useEffect(() => {
        fetch('http://localhost:3001/productos')
            .then((response) => response.json())
            .then((data) => {
                setProductos(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching productos:', error);
                setIsLoading(false);
            });
    }, []);

    const handleCategoriaClick = (categoria) => {
        setCategoriaSeleccionada((prev) => (prev === categoria ? '' : categoria));
    };

    const handlePrecioClick = (rango) => {
        setPrecioSeleccionado((prev) => (prev === rango ? '' : rango));
    };

    const productosFiltrados = productos.filter((producto) => {
        if (categoriaSeleccionada === 'Otros') {
            return producto.categoria !== 'Insectos' && producto.categoria !== 'Roedores';
        }
        return categoriaSeleccionada === '' || producto.categoria === categoriaSeleccionada;
    }).filter((producto) => {
        if (precioSeleccionado === 'bajo') {
            return producto.precio < 33;
        } else if (precioSeleccionado === 'medio') {
            return producto.precio >= 33 && producto.precio <= 66;
        } else if (precioSeleccionado === 'alto') {
            return producto.precio > 66;
        }
        const minPrice = precioMin !== '' ? parseFloat(precioMin) : 0;
        const maxPrice = precioMax !== '' ? parseFloat(precioMax) : Infinity;
        return producto.precio >= minPrice && producto.precio <= maxPrice;
    });

    const categoriaTitulo = categoriaSeleccionada || 'Todos los Productos';

    return (
        <>
            <Header />

            <div className="allproducts-page">
                <div className="allproducts-filter__container">
                    <h3 className="allproducts-filter__title">Filtrar por</h3>

                    <div className="allproducts-category__filter">
                        <h4>Categoria</h4>
                        <div 
                            className={`allproducts-category__item insectos ${categoriaSeleccionada === 'Insectos' ? 'active' : ''}`} 
                            onClick={() => handleCategoriaClick('Insectos')}>
                            <span>Insectos</span>
                        </div>

                        <div 
                            className={`allproducts-category__item roedores ${categoriaSeleccionada === 'Roedores' ? 'active' : ''}`} 
                            onClick={() => handleCategoriaClick('Roedores')}>
                            <span>Roedores</span>
                        </div>

                        <div 
                            className={`allproducts-category__item otros ${categoriaSeleccionada === 'Otros' ? 'active' : ''}`} 
                            onClick={() => handleCategoriaClick('Otros')}>
                            <span>Otros</span>
                        </div>

                        <div 
                            className={`allproducts-category__item todos ${categoriaSeleccionada === '' ? 'active' : ''}`} 
                            onClick={() => handleCategoriaClick('')}>
                            <span>Todos</span>
                        </div>
                    </div>

                    <div className="allproducts-price__filter">
                        <h4>Precio</h4>
                        <div 
                            className={`allproducts-price__item bajo ${precioSeleccionado === 'bajo' ? 'active' : ''}`} 
                            onClick={() => handlePrecioClick('bajo')}>
                            <span>Bajo (0 - 33)</span>
                        </div>
                        <div 
                            className={`allproducts-price__item medio ${precioSeleccionado === 'medio' ? 'active' : ''}`} 
                            onClick={() => handlePrecioClick('medio')}>
                            <span>Medio (34 - 66)</span>
                        </div>
                        <div 
                            className={`allproducts-price__item alto ${precioSeleccionado === 'alto' ? 'active' : ''}`} 
                            onClick={() => handlePrecioClick('alto')}>
                            <span>Alto (67 - 100)</span>
                        </div>
                    </div>

                    <div className="allproducts-price__manual-filter">
                        <h4>Rango de Precio</h4>
                        <div className="allproducts-price__manual-inputs">
                            <input 
                                type="number" 
                                placeholder="Precio Mínimo" 
                                value={precioMin} 
                                onChange={(e) => setPrecioMin(e.target.value)} 
                                min="0" 
                            />
                            <input 
                                type="number" 
                                placeholder="Precio Máximo" 
                                value={precioMax} 
                                onChange={(e) => setPrecioMax(e.target.value)} 
                                min="0" 
                            />
                        </div>
                        <button 
                            className="allproducts-price__apply-button" 
                            onClick={() => {
                                setPrecioSeleccionado(''); // Desactivar otros filtros
                            }}>
                            Aplicar Filtros
                        </button>
                    </div>
                </div>

                <div className="allproducts-products__container">
                    <h2 className="allproducts-products__title">{categoriaTitulo}</h2>

                    <div className='allproducts-products'>
                        {isLoading ? (
                            <p>Cargando productos...</p>
                        ) : productosFiltrados.length > 0 ? (
                            productosFiltrados.map((producto) => (
                                <div className='allproducts-product__card' key={producto.id}>
                                    <Link to={`/ProductDetails/${producto.id}`}>
                                        <img 
                                            src={`http://localhost:3001${producto.imagen}`} 
                                            alt={producto.nombre} 
                                            className='allproducts-product__image'
                                        />
                                    </Link>
                                    <h4 className='allproducts-product__title'>{producto.nombre}</h4>
                                    <p className='allproducts-product__price'>${producto.precio.toFixed(3)} COP</p>
                                    <button 
                                        className='allproducts-add-to-cart__button'
                                        onClick={() => addToCart(producto, 1)}>
                                        Añadir al carrito
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No hay productos disponibles en esta categoría.</p>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default AllProducts;
