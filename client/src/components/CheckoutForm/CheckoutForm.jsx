import React from "react";
import "./CheckoutForm.css";

const CheckoutForm = ({ name, setName, email, setEmail, submitOrder }) => {
  return (
    <div className="checkout-container">
      <h2>3. Checkout</h2>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <button onClick={submitOrder} className="submit-btn">
        Submit Order
      </button>
    </div>
  );
};

export default CheckoutForm;
