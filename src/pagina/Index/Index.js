import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar el hook useNavigate
import axios from "axios";
import './Index.css';
import Header from "../../componentes/Header/Header";
import Footer from "../../componentes/Footer/Footer";
import IndexCarrousel from "../../componentes/IndexCarrousel/IndexCarrousel";
import MarketCompes from "../../componentes/MarketCompetencies/MarketCompes";
import pulga from '../../assets/Categorys/pulga.png';
import cucaracha from '../../assets/Categorys/cucaracha.png';
import mosca from '../../assets/Categorys/mosca.png';
import hormiga from '../../assets/Categorys/hormiga.png';
import zancudo from '../../assets/Categorys/zancudo-de-agua.png';
import cart from '../../assets/icons/cart-white.png';
import { useCart } from "../../context/CartContext/CartContext"; // Ajusta la ruta si es necesario

// Función para formatear precios
const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 3
  }).format(precio);
};

const Index = () => {
    const [producto1, setProducto1] = useState(null);
    const [producto66f8, setProducto66f8] = useState(null);
    const { addToCart } = useCart(); // Importar función del contexto del carrito
    const navigate = useNavigate(); // Hook para la navegación

    useEffect(() => {
        // Llamada a la API para obtener los productos
        axios.get('http://localhost:3001/productos')
            .then(response => {
                const producto1 = response.data.find(producto => producto.id === "1");
                setProducto1(producto1);

                const producto66f8 = response.data.find(producto => producto.id === '66f8');
                setProducto66f8(producto66f8);
            })
            .catch(error => {
                console.error("Error al obtener los productos: ", error);
            });
    }, []);

    // Función para manejar el click en la imagen y redirigir
    const handleImageClick = (productoId) => {
        navigate(`/ProductDetails/${productoId}`);
    };

    return (
        <>
            <Header />
            <IndexCarrousel />
            <div className="lol"></div>
            <MarketCompes />

            <div className="featured-product">
                <div className="featured-title__container">
                    <h2 className="featured__title">Producto destacado</h2>
                    <p className="featured__subtitle">Línea de insecticidas</p>
                </div>
                
                <div className="featured-products__container">
                    {producto66f8 && (
                        <div className="featured-product__container left">
                            <div className="featured-product__title-container">
                                <h4 className="featured-product__title">Para uso industrial</h4>
                            </div>
                            <div className="featured-product__content">
                                <div className="product-details__container-left">
                                    <h3 className="product-content__title">{producto66f8.nombre}</h3>
                                    <p className="product-content__description">{producto66f8.descripcion}</p>
                                </div>
                                
                                <div className="order-product__container">
                                    <img 
                                        className="product-content__image" 
                                        src={producto66f8.imagen} 
                                        alt={producto66f8.nombre} 
                                        onClick={() => handleImageClick(producto66f8.id)} // Navegar a detalles del producto
                                        style={{ cursor: 'pointer' }} // Estilo de cursor para indicar que es clicable
                                    />
                                    <p className="product-content__price">{formatearPrecio(producto66f8.precio)} COP</p>
                                    <button className="product-content__button" onClick={() => addToCart(producto66f8, 1)}>
                                        <img src={cart} alt="Añadir al carrito" className="featured-cart" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="featured-products__categorys-container">
                        <ul className="featured-products__list">
                            <li className="category-item"><img className="category-image__featured" src={pulga} alt="Pulga" /></li>
                            <li className="category-item"><img className="category-image__featured" src={cucaracha} alt="Cucaracha" /></li>
                            <li className="category-item"><img className="category-image__featured" src={mosca} alt="Mosca" /></li>
                            <li className="category-item"><img className="category-image__featured" src={hormiga} alt="Hormiga" /></li>
                            <li className="category-item"><img className="category-image__featured" src={zancudo} alt="Zancudo" /></li>
                        </ul>
                    </div>

                    {producto1 && (
                        <div className="featured-product__container-right">
                            <div className="featured-product__title-container">
                                <h4 className="featured-product__title">Para uso industrial</h4>
                            </div>

                            <div className="featured-product__content right">
                                <div className="order-product__container">
                                    <img 
                                        className="product-content__image-right" 
                                        src={producto1.imagen} 
                                        alt={producto1.nombre} 
                                        onClick={() => handleImageClick(producto1.id)} // Navegar a detalles del producto
                                        style={{ cursor: 'pointer' }} // Estilo de cursor para indicar que es clicable
                                    />
                                    <p className="product-content__price">{formatearPrecio(producto1.precio)} COP</p>
                                    <button className="product-content__button" onClick={() => addToCart(producto1, 1)}>
                                        <img src={cart} alt="Añadir al carrito" className="featured-cart" />
                                    </button>
                                </div>
                                <div className="product-details__container-right">
                                    <h3 className="product-content__title">{producto1.nombre}</h3>
                                    <p className="product-content__description">{producto1.descripcion}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Index;
