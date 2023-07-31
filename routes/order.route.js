import express from "express";
import { VerifyToken } from "../middleware/jwt.js";
import { getOrders,PaymentIntent} from "../controllers/order.controller.js";

const router = express.Router();
// router.post("/createOrder/:id", VerifyToken, createOrder);
router.get("/getOrders", VerifyToken, getOrders);
router.post("/create-payment-intent/:id", VerifyToken, PaymentIntent)

export default router;
