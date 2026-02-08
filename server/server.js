import express from "express";
import cors from "cors";

const app = express();
const PORT = 8080;

// Middleware
app.use(cors()); // Allows your React app to talk to this server
app.use(express.json()); // Allows the server to understand JSON data sent from React

// --- TEMPORARY DATA (Since we aren't using a DB yet) ---
const beverages = [
  { id: 1, name: "Classic Lemonade", price: 5.0 },
  { id: 2, name: "Strawberry Fizz", price: 6.5 },
  { id: 3, name: "Iced Tea", price: 4.0 },
];

const orders = [];
// --- ROUTES ---

// GET /beverages
// This is what the Frontend will call to get the list of drinks
app.get("/beverages", (req, res) => {
  res.json(beverages);
});

app.get("/orders", (req, res) => {
  res.json(orders);
});

// POST /orders
app.post("/orders", (req, res) => {
  const orderData = req.body;

  // 3. Create a clean order object with a timestamp
  const newOrder = {
    id: Date.now(),
    ...orderData, // Copies customerName, email, items, total
    date: new Date().toISOString(),
  };

  // 4. Save it to our array
  orders.push(newOrder);

  console.log("New Order Received:", newOrder);

  res.json({
    message: "Order received successfully!",
    orderId: newOrder.id,
  });
});

app.get("/", (req, res) => {
  console.log("Accessed the home page! /");
  res.json("test!!!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
