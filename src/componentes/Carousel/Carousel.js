import React, { useState, useEffect} from "react";
import './Carousel.css';


const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="welcome__box">
                <div className="carousel-container">
        <div className="carousel">
            <div className="carousel__slides">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index}`}
                        className={`carousel__slide ${index === currentIndex ? 'active' : ''}`}
                    />
                ))}
            </div>
            <div className="carousel__overlay"></div>
        </div>
        </div>
                <div className="welcome__titles--box">
                    <h1 className="welcome__title">BIENVENIDO</h1>
                    <h3 className="welcome__subtitle">¡Explora todos los productos que tenemos para ti!</h3>
                </div>
            </div>
    );
};

export default Carousel;