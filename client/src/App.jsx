import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [beverages, setBeverages] = useState([]);
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    const fetchBeverages = async () => {
      try {
        const response = await axios.get("http://localhost:8080/beverages");
        setBeverages(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBeverages();
  }, []);


  const addToCart = (drink) => {
    setCart((prevCart) => [...prevCart, drink]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) =>
      prevCart.filter((_, index) => index !== indexToRemove),
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const submitOrder = async () => {
    if (cart.length === 0) return alert("Please select a drink first!");
    if (!name || !email) return alert("Please enter your name and email.");

    const orderData = {
      customerName: name,
      customerEmail: email,
      items: cart,
      total: totalPrice,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/orders",
        orderData,
      );

      setOrderStatus(`Order #${response.data.orderId} placed successfully!`);
      setCart([]); 
      setName(""); 
      setEmail("");
    } catch (error) {
      console.error("Error submitting order:", error);
      setOrderStatus("Failed to place order. Please try again.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1>The Lemonade Stand</h1>
      <h2>Order a refreshing drink in our virtual lemonade stand!</h2>

      <h2>1. Choose your drinks</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {beverages.map((drink) => (
          <div
            key={drink.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              width: "200px",
            }}
          >
            <h3>{drink.name}</h3>
            <p>${drink.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(drink)}
              style={{
                cursor: "pointer",
                padding: "5px 10px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Add to Order
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div
          style={{
            marginTop: "40px",
            borderTop: "2px solid #eee",
            paddingTop: "20px",
          }}
        >
          <h2>2. Your Order</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index} style={{ marginBottom: "5px" }}>
                {item.name} - ${item.price.toFixed(2)}
                <button
                  onClick={() => removeFromCart(index)}
                  style={{
                    marginLeft: "10px",
                    color: "red",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>

          <div
            style={{
              marginTop: "20px",
              background: "#f9f9f9",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h3>Checkout Details</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                maxWidth: "300px",
              }}
            >
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ padding: "8px" }}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: "8px" }}
              />
              <button
                onClick={submitOrder}
                style={{
                  padding: "10px",
                  background: "#28a745",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "4px",
                  fontSize: "16px",
                }}
              >
                Submit Order
              </button>
            </div>
          </div>
        </div>
      )}

      {orderStatus && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#dff0d8",
            color: "#3c763d",
            borderRadius: "4px",
            border: "1px solid #d6e9c6",
          }}
        >
          {orderStatus}
        </div>
      )}
    </div>
  );
};

export default App;
