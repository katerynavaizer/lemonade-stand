import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // <--- NEW: For navigation
import { toast } from "react-toastify";

// Import Components
import BeverageList from "../../components/BeverageList/BeverageList.jsx";
import Cart from "../../components/Cart/Cart.jsx";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm.jsx";
import { orderSchema } from "../../schemas/order";

// Import Page-Specific CSS
import "./Shop.css"; // <--- NEW: Import the CSS file you just created

const Shop = () => {
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
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
        const response = await axios.get(`${API_URL}/beverages`);
        setBeverages(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load menu.");
      }
    };
    fetchBeverages();
  }, []);

  const addToCart = (drink) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === drink.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === drink.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { ...drink, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (drinkId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === drinkId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const submitOrder = async () => {
    const orderData = {
      customerName: name,
      customerEmail: email,
      items: cart,
      total: totalPrice,
    };

    // 1. VALIDATION
    const validationResult = orderSchema.safeParse(orderData);

    if (!validationResult.success) {
      try {
        const errorArray = JSON.parse(validationResult.error.message);
        toast.error(errorArray[0].message, {
          position: "top-center",
          hideProgressBar: true,
          autoClose: 3000,
        });
      } catch (e) {
        toast.error("Invalid input. Please check your details.", {
          position: "top-center",
          hideProgressBar: true,
        });
      }
      return;
    }

    // 2. SERVER REQUEST
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
      if (error.response && error.response.data.message) {
        setOrderStatus(error.response.data.message);
      } else {
        setOrderStatus("Failed to place order. Please try again.");
      }
      setIsSuccess(false);
    }
  };

  const resetOrder = () => {
    setIsSuccess(false);
    setOrderStatus("");
  };

  return (
    <div className="shop-container">
      <header className="shop-header">
        <h1>Lemonade Stand</h1>
        <Link to="/orders" className="history-link">
          My Orders
        </Link>
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
                  <span>{item.name}</span>
                  <span>x{item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
          <button className="reset-btn" onClick={resetOrder}>
            Place Another Order
          </button>
        </div>
      ) : (
        <div className="shop-layout">
          <div className="menu-section">
            <BeverageList beverages={beverages} addToCart={addToCart} />
          </div>

          <div className="sidebar-section">
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

export default Shop;
