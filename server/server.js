import express from "express";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

const beverages = [
  { id: 1, name: "Classic Lemonade", price: 5.0 },
  { id: 2, name: "Strawberry Fizz", price: 6.5 },
  { id: 3, name: "Iced Tea", price: 4.0 },
];

const orders = [];

app.get("/beverages", (req, res) => {
  res.json(beverages);
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
    orderId: newOrder.id,
  });
});

app.get("/", (req, res) => {
  console.log("Accessed the home page! /");
  res.json("test!!!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
