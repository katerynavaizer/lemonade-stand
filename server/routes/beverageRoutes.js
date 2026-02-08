import express from "express";
import * as beverageController from "../controllers/beverageController.js";

const router = express.Router();
router.get("/", beverageController.getBeverages);
export default router;
