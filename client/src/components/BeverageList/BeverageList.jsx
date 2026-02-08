import React from "react";
import "./BeverageList.css";

const BeverageList = ({ beverages, addToCart }) => {
  return (
    <div className="beverage-section">
      <h2>1. Choose your drinks</h2>
      <div className="beverage-grid">
        {beverages.map((drink) => (
          <div key={drink.id} className="beverage-card">
            <h3>{drink.name}</h3>
            <p className="price">${drink.price.toFixed(2)}</p>
            <button onClick={() => addToCart(drink)}>Add to Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeverageList;
