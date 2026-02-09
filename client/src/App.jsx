import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BeverageList from "./components/BeverageList/BeverageList.jsx";
import Cart from "./components/Cart/Cart.jsx";
import CheckoutForm from "./components/CheckoutForm/CheckoutForm.jsx";
import { orderSchema } from "./schemas/order";

const App = () => {
  const [beverages, setBeverages] = useState([]);
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

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
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === drink.id);

      if (existingItem) {
        // 2. If yes, map through and increase quantity for that specific drink
        return prevCart.map((item) =>
          item.id === drink.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        // 3. If no, add new drink with quantity: 1
        return [...prevCart, { ...drink, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (drinkId) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) => {
            if (item.id === drinkId) {
              return { ...item, quantity: item.quantity - 1 }; // Decrease count
            }
            return item;
          })
          .filter((item) => item.quantity > 0), // Remove entirely if count is 0
    );
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const submitOrder = async () => {
    // 1. Prepare the data payload
    const orderData = {
      customerName: name,
      customerEmail: email,
      items: cart,
      total: totalPrice,
    };

    // 2. Client-Side Validation (UX)
    const validationResult = orderSchema.safeParse(orderData);

    if (!validationResult.success) {
      // --- TOAST ERROR IMPLEMENTATION ---
      try {
        // Parse the error string back into an array to get the message
        const errorArray = JSON.parse(validationResult.error.message);

        // Show the first error in a Toast (No progress bar)
        toast.error(errorArray[0].message, {
          hideProgressBar: true,
          autoClose: 3000,
        });
      } catch (e) {
        // Fallback
        toast.error("Invalid input. Please check your details.", {
          hideProgressBar: true,
        });
      }
      return; // Stop here, do not send to server
    }

    // 3. Server Request (If valid)
    try {
      const response = await axios.post(
        "http://localhost:8080/orders",
        orderData,
      );

      setOrderStatus(`Order #${response.data.orderId} placed successfully!`);
      setLastOrder(response.data.order);
      setIsSuccess(true);
      setCart([]);
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error submitting order:", error);

      // Handle Server Validation Errors (400 Bad Request)
      if (error.response && error.response.data.message) {
        setOrderStatus(error.response.data.message);
      } else {
        setOrderStatus("Failed to place order. Please try again.");
      }
      setIsSuccess(false);
    }
  };

  const resetOrder = () => {
    setIsSuccess(false); // Switch back to shopping view
    setOrderStatus(""); // Clear the success message
  };

  return (
    <div className="app-container">
      {/* 2. Add Toast Container (Global settings) */}
      <ToastContainer position="top-center" hideProgressBar={true} />

      <header>
        <h1>Lemonade Stand</h1>
      </header>

      {isSuccess && lastOrder ? (
        <div className="success-view">
          <div className="success-message">
            Order #{lastOrder.id} confirmed!
          </div>
          <div className="receipt-card">
            <p>
              <strong>Name:</strong> {lastOrder.customerName}
            </p>
            <p>
              <strong>Email:</strong> {lastOrder.customerEmail}
            </p>
            <p>
              <strong>Total:</strong> ${Number(lastOrder.total).toFixed(2)}
            </p>
            <ul>
              {lastOrder.items.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.quantity}
                </li>
              ))}
            </ul>
          </div>
          <button className="reset-btn" onClick={resetOrder}>
            Place Another Order
          </button>
        </div>
      ) : (
        <div className="layout-grid">
          {" "}
          {/* Updated structure starts here */}
          <div className="menu-column">
            <BeverageList beverages={beverages} addToCart={addToCart} />
          </div>
          <div className="sidebar-column">
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              addToCart={addToCart}
              totalPrice={totalPrice}
            />

            {cart.length > 0 && (
              <CheckoutForm
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                submitOrder={submitOrder}
              />
            )}
          </div>
        </div>
      )}

      {orderStatus && !isSuccess && (
        <div className="error-message">{orderStatus}</div>
      )}
    </div>
  );
};

export default App;
