import { pool } from "../config/db.js";

export const getAllBeverages = async () => {
  const result = await pool.query("SELECT * FROM beverages ORDER BY id ASC");
  return result.rows;
};
