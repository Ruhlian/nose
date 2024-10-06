import React, { useState, useEffect } from "react";
import "./ValuesCarrousel.css";
import innovacion from '../../assets/ValuesCarrusel/innovacion.jpg';
import colaboracion from '../../assets/ValuesCarrusel/colaboracion.jpg';
import integridad from '../../assets/ValuesCarrusel/integridad.jpg';
import responsabilidad from '../../assets/ValuesCarrusel/responsabilidad.png';
import calidad from '../../assets/ValuesCarrusel/calidad.jpg';
import adelante from '../../assets/icons/flecha-adelante-azul.png';
import atras from '../../assets/icons/flecha-atras-azul.png';

const valuesData = [
  {
    title: "Innovación",
    description: "Buscamos constantemente nuevas soluciones y tecnologías avanzadas para mejorar la eficacia de nuestros pesticidas y adaptarnos a las necesidades cambiantes del mercado.",
    image: innovacion,
  },
  {
    title: "Colaboración",
    description: "Creemos en el trabajo en equipo para crear soluciones efectivas y sostenibles que beneficien tanto a la empresa como a nuestros clientes.",
    image: colaboracion,
  },
  {
    title: "Integridad",
    description: "Actuamos con transparencia y ética en todas nuestras operaciones, construyendo relaciones de confianza con nuestros clientes y socios.",
    image: integridad,
  },
  {
    title: "Responsabilidad",
    description: "Asumimos un compromiso firme con la salud pública y el bienestar de la comunidad, asegurando que nuestros productos sean seguros y efectivos.",
    image: responsabilidad,
  },
  {
    title: "Calidad",
    description: "Nos enfocamos en ofrecer productos de alta calidad, garantizando su eficacia y confiabilidad para el control de plagas.",
    image: calidad,
  },
];

const ValuesCarrousel = () => {
  const [currentIndex, setCurrentIndex] = useState(2); // Empieza con el tercer valor centrado

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + valuesData.length) % valuesData.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % valuesData.length);
  };

  // Transición automática cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="values-carrusel-container">
      
      <h2 className="values-title">Nuestros valores</h2>
      <div className="values-carrusel">
        <img src={atras} className="values-carrusel-button left" onClick={handlePrev} alt="">
        </img>
        <div className="values-carrusel-track">
          {valuesData.map((value, index) => {
            // Calcular la posición de la slide para que sea continua en ambas direcciones
            const relativeIndex = (index - currentIndex + valuesData.length) % valuesData.length;
            const offset = relativeIndex < valuesData.length / 2 ? relativeIndex : relativeIndex - valuesData.length;

            // Escala y opacidad en función de su proximidad al centro
            const scale = offset === 0 ? 1.2 : 1 - Math.abs(offset) * 0.2;
            const opacity = offset === 0 ? 1 : 0.5 - Math.abs(offset) * 0.1;

            return (
              <div
                key={index}
                className="card"
                style={{
                  transform: `translateX(${offset * 100}%) scale(${scale})`,
                  opacity: opacity,
                  zIndex: 10 - Math.abs(offset), // Asegura que el centro tenga mayor prioridad visual
                }}
              >
                <img src={value.image} alt={value.title} className="value-image"/>
                <div className="values-card-content">
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <img src={adelante} className="values-carrusel-button right" onClick={handleNext} alt="">
        </img>
      </div>
    </div>
  );
};

export default ValuesCarrousel;
