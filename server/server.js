import express from "express";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres", // Use your Mac username or 'postgres'
  host: "localhost",
  database: "lemonade_db",
  password: "",
  port: 5432,
});

const app = express();
const PORT = 8080;

// Middleware
app.use(cors()); // Allows your React app to talk to this server
app.use(express.json()); // Allows the server to understand JSON data sent from React

const beverages = [
  { id: 1, name: "Classic Lemonade", price: 5.0 },
  { id: 2, name: "Strawberry Fizz", price: 6.5 },
  { id: 3, name: "Iced Tea", price: 4.0 },
  // { id: 4, name: "Coconut refresh", price: 4.0 },
  // { id: 5, name: "Matcha", price: 4.0 },
];

const orders = [];

app.get("/beverages", async (req, res) => {
  // res.json(beverages);
  try {
    const result = await pool.query("SELECT * FROM beverages ORDER BY id ASC");
    console.log("my result: " + result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.post("/orders", (req, res) => {
  const orderData = req.body;

  const newOrder = {
    id: Date.now(),
    ...orderData,
    date: new Date().toISOString(),
  };

  orders.push(newOrder);

  console.log("New Order Received:", newOrder);

  res.json({
    message: "Order received successfully!",
    order: newOrder,
  });
});

app.get("/", (req, res) => {
  console.log("Accessed the home page! /");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
