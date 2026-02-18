import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

import authMiddleware from "../middlewire/authMiddleware.js"; 


const router = express.Router();

// Add product to wishlist
// POST /api/wishlist/add
router.post("/add", authMiddleware, addToWishlist);

// Get user's wishlist
// GET /api/wishlist
router.get("/", authMiddleware, getWishlist);

// Remove product from wishlist
// DELETE /api/wishlist/remove
router.delete("/remove", authMiddleware, removeFromWishlist);

export default router;
