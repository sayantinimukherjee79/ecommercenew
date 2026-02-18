import Wishlist from "../models/wishlistModel.js";
import Product from "../models/Product.js";

// Add product to wishlist
export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        if (!productId) {
            return res.status(400).json({ message: "productId is required" });
        }

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            // Create a new wishlist if it doesn't exist
            wishlist = new Wishlist({ 
                user: req.user._id,
                products: [productId]
                
                
            });
        } else {
            if (!wishlist.products) wishlist.products = [];
            // Check if product already exists in wishlist
            const exists = wishlist.products.some(
                (p) => p.toString() === productId
            );
            if (exists) {
                return res
                    .status(400)
                    .json({ message: "Product already in wishlist" });
            }
            wishlist.products.push(productId);
        }

        await wishlist.save();

        await Product.findByIdAndUpdate(productId, {$inc: {wishlistCount: 1}})

        // Populate product details
        await wishlist.populate({
            path: "products",
            model: "Product",
            select: "title price description image",
        });

        res.status(200).json(wishlist.products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user's wishlist
export const getWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const wishlist = await Wishlist.findOne({ user: userId }).populate({
            path: "products",
            model: "Product",
            select: "title price description image",
        });

        if (!wishlist) {
           
            return res.status(200).json({ items: [] });
        }

        res.status(200).json(wishlist.products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;

        const wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

        // Ensure items array exists

        if (!wishlist.products) wishlist.products = [];

        // Remove the product
       wishlist.products = wishlist.products.filter(
            (p) => p.toString() !== productId
        );

        await wishlist.save();

        // decrement of product

        await Product.findByIdAndUpdate(productId, { $inc: {wishlistCount: -1}});

        // Populate product details
        await wishlist.populate({
            path: "products",
            model: "Product",
            select: "title price description image",
        });

        res.status(200).json(wishlist.products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
