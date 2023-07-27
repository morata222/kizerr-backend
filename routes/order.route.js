import express from "express";
import { VerifyToken } from "../middleware/jwt.js";
import { createOrder, getOrders } from "../controllers/order.controller.js";

const router = express.Router();
router.post("/createOrder/:id", VerifyToken, createOrder);
router.get("/getOrders", VerifyToken, getOrders);

export default router;
