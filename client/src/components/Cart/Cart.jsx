import React from "react";
import "./Cart.css";

const Cart = ({ cart, removeFromCart, totalPrice }) => {
  if (cart.length === 0) return null;

  return (
    <div className="cart-container">
      <h2>2. Review your order</h2>
      <ul className="cart-list">
        {cart.map((item, index) => (
          <li key={index} className="cart-item">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
            <button
              onClick={() => removeFromCart(index)}
              className="remove-btn"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Cart;
