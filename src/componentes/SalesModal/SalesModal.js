import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SalesModal.css'; // Asegúrate de crear este archivo para estilos

const SalesModal = ({ saleId, onClose, onDelete }) => {
    const [sale, setSale] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSaleDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/ventas/${saleId}`);
                setSale(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sale details:', error);
                setLoading(false);
            }
        };

        fetchSaleDetails();
    }, [saleId]);

    // const handleDelete = async () => {
    //     try {
    //         await axios.delete(`http://localhost:3001/ventas/${saleId}`);
    //         onDelete(); // Llama a onDelete para actualizar la lista de ventas
    //         onClose(); // Cierra el modal
    //     } catch (error) {
    //         console.error('Error deleting sale:', error);
    //     }
    // };

    if (loading) {
        return <div className="modal">Loading...</div>;
    }

    if (!sale) {
        return <div className="modal">Sale not found.</div>;
    }

    // Convertir la fecha en formato ISO 8601 a la hora local
    const localDate = new Date(sale.fecha).toLocaleString();

    return (
        <div className="sales-modal">
            <div className="sales-modal__content">
                <span className="sales-modal__close" onClick={onClose}>&times;</span>
                <h2>Detalles de la Venta</h2>
                <p><strong>ID:</strong> {sale.id}</p>
                <p><strong>Fecha y Hora:</strong> {localDate}</p>
                <p><strong>Cliente:</strong> {sale.cliente}</p>
                <p><strong>Total:</strong> ${sale.total.toFixed(2)}</p>
                <p><strong>Estado:</strong> {sale.estado}</p>
                <h3>Productos:</h3>
                <ul>
                    {sale.items.map(item => (
                        <li key={item.producto_id}>
                            <p><strong>Producto:</strong> {item.nombre_producto}</p>
                            <p><strong>Cantidad:</strong> {item.cantidad}</p>
                            <p><strong>Precio Unitario:</strong> ${item.precio_unitario.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SalesModal;
