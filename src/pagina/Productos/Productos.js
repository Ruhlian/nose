import React, { useEffect, useState } from 'react';
import './Productos.css';
import Header from '../../componentes/Header/Header';
import Footer from '../../componentes/Footer/Footer';
import insecto from '../../assets/categories/insecto.png';
import roedor from '../../assets/categories/raton.png';
import todos from '../../assets/categories/todos.png';
import otros from '../../assets/categories/otros.png';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext/CartContext'; // Importa useCart

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const { addToCart } = useCart(); // Desestructurar addToCart

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
        if (categoriaSeleccionada === categoria) {
            setCategoriaSeleccionada('');
        } else {
            setCategoriaSeleccionada(categoria);
        }
    };

    const productosFiltrados = productos.filter((producto) => {
        if (categoriaSeleccionada === 'Otros') {
            return producto.categoria !== 'Insectos' && producto.categoria !== 'Roedores';
        }
        return producto.categoria === categoriaSeleccionada || categoriaSeleccionada === '';
    });

    const productosMostrados = categoriaSeleccionada === '' ? productos.slice(0, 5) : productosFiltrados;

    const categoriaTitulo = categoriaSeleccionada || 'Productos';

    return (
        <>
            <Header />

            <div className="product-image__container">
                <div className="product-image-titles__container">
                    <h2 className="product-image-title">PRODUCTOS</h2>
                    <h3 className="product-image-subtitle">Calidad y seguridad en cada producto.</h3>
                </div>
            </div>

            <div className='product-main__container'>
                <div className='category-main__container'>
                    <div 
                        className={`category-main__category insectos ${categoriaSeleccionada === 'Insectos' ? 'active' : ''}`} 
                        onClick={() => handleCategoriaClick('Insectos')}>
                        <h3 className='main__category-title'>Insectos</h3>
                        <img src={insecto} className='main__category-image insecto' alt='Insectos'></img>
                    </div>

                    <div 
                        className={`category-main__category roedores ${categoriaSeleccionada === 'Roedores' ? 'active' : ''}`} 
                        onClick={() => handleCategoriaClick('Roedores')}>
                        <h3 className='main__category-title'>Roedores</h3>
                        <img src={roedor} className='main__category-image roedor' alt='Roedores'></img>
                    </div>

                    <div 
                        className={`category-main__category otros ${categoriaSeleccionada === 'Otros' ? 'active' : ''}`} 
                        onClick={() => handleCategoriaClick('Otros')}>
                        <h3 className='main__category-title'>Otros</h3>
                        <img src={otros} alt='Otros' className='main__category-image otro'></img>
                    </div>

                    <div className='category-main__category todos'>
                        <h3 className='main__category-title'>
                            Todos
                        </h3>
                        <img src={todos} alt='Todos' className='main__category-image todo'></img>
                    </div>
                </div>

                <div className='products-main__container'>
                    <h2 className='products-main__title'>{categoriaTitulo}</h2>

                    <div className='products-container'>
                        {isLoading ? (
                            <p>Cargando productos...</p>
                        ) : productosMostrados.length > 0 ? (
                            productosMostrados.map((producto) => (
                                <div className='products-container__container' key={producto.id}>
                                    <Link to={`/ProductDetails/${producto.id}`}>
                                        <img 
                                            src={`http://localhost:3001${producto.imagen}`} 
                                            alt={producto.nombre} 
                                            className='product-container__image'
                                        />
                                    </Link>
                                    <h4 className='product-container__title'>{producto.nombre}</h4>
                                    <p className='product-container__price'>${producto.precio.toFixed(3)} COP</p>
                                    <button 
                                        className='product-container__add-product'
                                        onClick={() => addToCart(producto, 1)} // Llama a addToCart con el producto y la cantidad
                                    >
                                        Añadir al carrito
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No hay productos disponibles en esta categoría.</p>
                        )}
                    </div>
                    <div className='product__all-products'>
                        <Link to="../AllProducts">Ver todos{" >"}</Link>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Productos;