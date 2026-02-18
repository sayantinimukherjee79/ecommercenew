import express from "express";
import {addToCart, getCart, removeCartItem, updateCartItem} from "../controllers/cartController.js";
import authMiddleware from "../middlewire/authMiddleware.js";

const router = express.Router();

router.post("/add",authMiddleware,addToCart);
router.get("/",authMiddleware,getCart);
router.put("/update",authMiddleware,updateCartItem);
router.delete("/delete",authMiddleware,removeCartItem);

export default router;