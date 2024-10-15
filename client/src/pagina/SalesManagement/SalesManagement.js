import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SalesModal from '../../componentes/SalesModal/SalesModal';
import './SalesManagement.css';

const SalesManagement = () => {
    const [sales, setSales] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedSaleId, setSelectedSaleId] = useState(null);

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {
        try {
            const response = await axios.get('http://localhost:3001/ventas');
            setSales(response.data);
        } catch (error) {
            console.error('Error fetching sales:', error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.patch(`http://localhost:3001/ventas/${id}`, { estado: newStatus });
            fetchSales(); // Re-fetch sales after update
        } catch (error) {
            console.error('Error updating sale status:', error);
        }
    };

    const handleDeleteSale = (id) => {
        setSales(sales.filter(sale => sale.id !== id)); // Eliminar la venta del estado local
    };

    const filteredSales = selectedStatus === 'All'
        ? sales
        : sales.filter(sale => sale.estado === selectedStatus);

    return (
        <div className="sales-management">
            <div className='header-title__container'>
                <h1 className='manage-title'>Gestión de Ventas</h1>
            </div>
            <div className='sales__container'>
            <div className="sales-filters">
                <label>Filtrar por estado:</label>
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                    <option value="All">Todos</option>
                    <option value="Aceptada">Aceptada</option>
                    <option value="Cancelada">Cancelada</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Proceso">En Proceso</option>
                </select>
            </div>
            <table className="sales-table">
                <thead>
                    <tr>
                        <th className='table__title'>ID</th>
                        <th className='table__title'>Fecha</th>
                        <th className='table__title'>Cliente</th>
                        <th className='table__title'>Total</th>
                        <th className='table__title'>Estado</th>
                        <th className='table__title'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSales.map(sale => (
                        <tr key={sale.id}>
                            <td>{sale.id}</td>
                            <td>{new Date(sale.fecha).toLocaleDateString()}</td>
                            <td>{sale.cliente}</td>
                            <td>${sale.total.toFixed(2)}</td>
                            <td>
                                <select
                                    value={sale.estado}
                                    onChange={(e) => handleStatusChange(sale.id, e.target.value)}
                                >
                                    <option value="Aceptada">Aceptada</option>
                                    <option value="Cancelada">Cancelada</option>
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="En Proceso">En Proceso</option>
                                </select>
                            </td>
                            <td>
                                <button onClick={() => setSelectedSaleId(sale.id)}>Ver Detalles</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedSaleId && (
                <SalesModal
                    saleId={selectedSaleId}
                    onClose={() => setSelectedSaleId(null)}
                    onDelete={() => handleDeleteSale(selectedSaleId)} // Pasa la función de eliminar
                />
            )}
            </div>
        </div>
    );
};

export default SalesManagement;
