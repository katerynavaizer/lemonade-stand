import React from "react";
import "./Cart.css";

const Cart = ({ cart, removeFromCart, addToCart, totalPrice }) => {
  if (cart.length === 0) return null;

  return (
    <div className="cart-container">
      <h2>2. Your Order</h2>
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="item-details">
              <span className="item-name">{item.name}</span>
              <span className="item-price">
                ${(Number(item.price) * item.quantity).toFixed(2)}
              </span>
            </div>

            <div className="qty-controls">
              <button
                className="qty-btn minus"
                onClick={() => removeFromCart(item.id)}
              >
                -
              </button>

              <span className="qty-number">{item.quantity}</span>

              <button className="qty-btn plus" onClick={() => addToCart(item)}>
                +
              </button>
            </div>
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
