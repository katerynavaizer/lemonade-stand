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

// const beverages = [
//   { id: 1, name: "Classic Lemonade", price: 5.0 },
//   { id: 2, name: "Strawberry Fizz", price: 6.5 },
//   { id: 3, name: "Iced Tea", price: 4.0 },
//   // { id: 4, name: "Coconut refresh", price: 4.0 },
//   // { id: 5, name: "Matcha", price: 4.0 },
// ];

// const orders = [];

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

app.get("/orders", async (req, res) => {
  try {
    // 1. Get all orders, newest first
    const result = await pool.query(
      "SELECT * FROM orders ORDER BY created_at DESC",
    );

    // 2. Translate DB columns (snake_case) to React props (camelCase)
    const formattedOrders = result.rows.map((order) => ({
      id: order.id,
      customerName: order.customer_name,
      customerEmail: order.customer_email,
      total: Number(order.total_price),
      items: order.order_items, // The JSONB column works automatically!
      date: order.created_at,
    }));

    res.json(formattedOrders);
  } catch (err) {
    console.error("Error fetching orders:", err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/orders", async (req, res) => {
  // const orderData = req.body;
  // const newOrder = {
  //   id: Date.now(),
  //   ...orderData,
  //   date: new Date().toISOString(),
  // };
  // orders.push(newOrder);
  // console.log("New Order Received:", newOrder);
  // res.json({
  //   message: "Order received successfully!",
  //   order: newOrder,
  // });

  const { customerName, customerEmail, items, total } = req.body;

  try {
    // We insert the Order AND the Items in one go!
    // $4 maps to 'items', which Postgres stores as JSON automatically.
    const query = `
      INSERT INTO orders (customer_name, customer_email, total_price, order_items)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    // The 'pg' library automatically handles the JSON conversion for $4
    const result = await pool.query(query, [
      customerName,
      customerEmail,
      total,
      JSON.stringify(items),
    ]);

    const newOrder = result.rows[0];

    console.log(`Order #${newOrder.id} saved!`);

    res.json({
      message: "Order placed successfully!",
      orderId: newOrder.id,
      order: {
        id: newOrder.id,
        customerName: newOrder.customer_name,
        customerEmail: newOrder.customer_email,
        total: Number(newOrder.total_price),
        items: newOrder.order_items, // Postgres returns this as a normal array
      },
    });
  } catch (err) {
    console.error("Order Error:", err.message);
    res.status(500).send("Server Error: Could not save order.");
  }
});

app.get("/", (req, res) => {
  console.log("Accessed the home page! /");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
