import express from "express";
import cors from "cors";
import beverageRoutes from "./routes/beverageRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandlers.js";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Routes
app.use("/beverages", beverageRoutes);
app.use("/orders", orderRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
