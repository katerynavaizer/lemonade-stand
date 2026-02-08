import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "lemonade_db",
  password: "",
  port: 5432,
});
