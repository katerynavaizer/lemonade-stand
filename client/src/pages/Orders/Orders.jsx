import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
        const response = await axios.get(`${API_URL}/orders`);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <header className="orders-header">
        <div className="header-text">
          <Link to="/" className="brand-title">
            <h1>Lemonade Stand</h1>
          </Link>
          <h2 className="page-subtitle">Order History</h2>
        </div>

        <Link to="/" className="back-btn">
          ← Back to Shop
        </Link>
      </header>

      {loading ? (
        <p>Loading your lemonade history...</p>
      ) : orders.length === 0 ? (
        <div className="empty-history">
          <p>No orders found yet!</p>
          <Link to="/" className="cta-link">
            Order drinks at the store
          </Link>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="card-header">
                <h3>Order #{order.id}</h3>
                <span className="order-date">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </div>

              <div className="customer-info">
                <p>{order.customerName}</p>
                <p className="email">{order.customerEmail}</p>
              </div>

              <div className="order-items">
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>${item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-footer">
                <strong>Total: ${Number(order.total).toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
