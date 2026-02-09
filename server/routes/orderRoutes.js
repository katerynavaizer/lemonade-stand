import express from "express";
import * as orderController from "../controllers/orderController.js";
import { validate } from "../middleware/validate.js";
import { orderSchema } from "../schemas/order.js";

const router = express.Router();
router.post("/", validate(orderSchema), orderController.createOrder);
router.get("/", orderController.getOrders);
export default router;
