import express from "express";

import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    addProductReview,
    getProductsByCategory,
    searchProducts,
    getNewProducts, 
    getSaleProducts,
    getTopWishedProducts,
    getTopSellingProducts
}
    from "../controllers/productController.js";

import upload from "../middlewire/upload.js";

const router = express.Router();

//define routes

// create a product

router.post("/",
    upload.single("image"),
    createProduct
);

//get all products

router.get("/", getAllProducts);

// Get new products
router.get("/new", getNewProducts);

// Get best deals / sale products
router.get("/sale", getSaleProducts);

router.get("/search", searchProducts);

router.get("/category/:id", getProductsByCategory);

router.get("/top-wished", getTopWishedProducts);

router.get("/top-selling", getTopSellingProducts);

//get a single product by id
router.get("/:id", getProductById);




//update a product

router.put(
    "/:id",
    upload.single("image"),
    updateProduct
);

//delete a product

router.delete("/:id", deleteProduct);

router.post("/:id/reviews", addProductReview);






export default router;
