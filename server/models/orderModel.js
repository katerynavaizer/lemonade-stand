import { pool } from "../config/db.js";

export const createOrder = async (
  customerName,
  customerEmail,
  total,
  items,
) => {
  const query = `
    INSERT INTO orders (customer_name, customer_email, total_price, order_items)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const result = await pool.query(query, [
    customerName,
    customerEmail,
    total,
    JSON.stringify(items),
  ]);
  return result.rows[0];
};

export const getAllOrders = async () => {
  const result = await pool.query(
    "SELECT * FROM orders ORDER BY created_at DESC",
  );
  return result.rows;
};
