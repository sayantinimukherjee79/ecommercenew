// categoryRoutes.js
import express from "express";
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from "../controllers/categoryController.js";

import authMiddleware from "../middlewire/authMiddleware.js"; // make sure folder name is correct

const router = express.Router();

// --------------------
// Public routes
// --------------------

// Get all categories
router.get("/", getAllCategories);

// Get single category by ID
router.get("/:id", getCategoryById);

// --------------------
// Admin routes
// --------------------

// Create a new category
router.post("/", authMiddleware, createCategory);

// Update a category
router.put("/:id", authMiddleware, updateCategory);

// Delete a category
router.delete("/:id", authMiddleware, deleteCategory);

export default router;
