import express from "express";
import { canReview, getAllOrder, getOrderById, placeOrder } from "../controllers/orderController.js";
import {authMiddleware} from "../middlewire/authMiddleware.js";

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.get("/myorders",authMiddleware, getAllOrder);
router.get("/:id", authMiddleware, getOrderById);
router.get("/can-review/:productId", authMiddleware, canReview);

export default router;
