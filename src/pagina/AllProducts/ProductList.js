// src/pagina/AllProducts/ProductList.js
import React from 'react';

const ProductList = () => {
  const productos = [
    { id: 1, nombre: 'Gold Light Cleaner', precio: '$44', descripcion: 'Limpiador facial', imgSrc: 'url_to_image1' },
    { id: 2, nombre: 'True Skin Radiant Priming Serum', precio: '$48', descripcion: 'Suero iluminador', imgSrc: 'url_to_image2' },
    { id: 3, nombre: 'Kitu Day Cream', precio: '$48', descripcion: 'Crema hidratante diaria', imgSrc: 'url_to_image3' },
    // Añade más productos aquí
  ];

  return (
    <div className="product-list">
      {productos.map(producto => (
        <div className="producto-card" key={producto.id}>
          <img src={producto.imgSrc} alt={producto.nombre} />
          <h3>{producto.nombre}</h3>
          <p>{producto.descripcion}</p>
          <p>{producto.precio}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
