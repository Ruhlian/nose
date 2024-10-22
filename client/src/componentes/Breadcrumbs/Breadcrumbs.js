// Breadcrumbs.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css'; // 

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    return (
        <nav aria-label="breadcrumb" className="breadcrumb">
            <ol>
                <li><Link to="/">Inicio</Link></li>
                {pathnames.map((pathname, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`; // Cambiado a comillas invertidas
                    const isActive = routeTo === location.pathname; 

                    return (
                        <li key={routeTo}>
                            <Link to={routeTo} className={isActive ? 'active' : ''}>
                                {pathname.charAt(0).toUpperCase() + pathname.slice(1)}
                            </Link>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export default Breadcrumbs;
