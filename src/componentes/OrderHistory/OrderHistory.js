import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext/AuthContext';
import './OrderHistory.css'; // Asegúrate de importar el archivo CSS

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user && user.correo) {  // Verificación adicional
        try {
          const response = await axios.get(`http://localhost:3001/ventas?correo=${user.correo}`);
          setOrders(response.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };
    
    fetchOrders();
  }, [user]);

  return (
    <div className="order-history__container">
      <h2 className="order-history__title">Historial de Órdenes</h2>
      {orders.length > 0 ? (
        <ul className="order-history__list">
          {orders.map(order => (
            <li key={order.id} className="order-history__item">
              <h3>Orden #{order.id}</h3>
              <p>Fecha: {new Date(order.fecha).toLocaleDateString()}</p>
              <p>Total: ${order.total}</p>
              <p>Estado: {order.estado}</p>
              <ul>
                {order.items.map(item => (
                  <li key={item.producto_id}>
                    {item.nombre_producto} - {item.cantidad} x ${item.precio_unitario}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="order-history__empty">No tienes órdenes aún.</p>
      )}
    </div>
  );
};

export default OrderHistory;
