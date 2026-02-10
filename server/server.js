import express from "express";
import cors from "cors";
import beverageRoutes from "./routes/beverageRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandlers.js";
import { seedDatabase } from "./config/seed.js";

const app = express();
const PORT = 8080;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://katerynavaizer.github.io"],
  }),
);
app.use(express.json());

// Routes
app.use("/beverages", beverageRoutes);
app.use("/orders", orderRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

seedDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
