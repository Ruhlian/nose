import React from 'react';
import './MarketCompes.css';
import salud from '../../assets/MarketCompes/salud-publica.jpg';
import industrial from '../../assets/MarketCompes/industrial.jpg';
import pecuario from '../../assets/MarketCompes/pecuario.jpg';
import agricola from '../../assets/MarketCompes/agricola.jpg';

const markets = [
  { title: 'SALUD PÚBLICA', image: salud, link: '/salud-publica' },
  { title: 'INDUSTRIAL', image: industrial, link: '/industrial' },
  { title: 'PECUARIO', image: pecuario, link: '/pecuario' },
  { title: 'AGRÍCOLA', image: agricola, link: '/agricola' }
];

const MarketCompes = () => {
  return (
    <div className="marketcompes-container">
      <div className='market-title__container'>
        <h2 className='market-title'>Mercados que protegemos con nuestros productos</h2>
      </div>
      <div className="market-grid">
        {markets.map((market, index) => (
          <div key={index} className="market-item" style={{ backgroundImage: `url(${market.image})` }}>
            <a href={market.link} className="market-link">
              <div className="overlay"></div>
              <h3 className='market-subtitles'>{market.title}{' >'}</h3>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketCompes;
