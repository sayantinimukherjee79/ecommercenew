import Product from "../models/Product.js";
import Category from "../models/categoryModel.js";
import cloudinary from "../config/cloudinary.js";


//create products

export const createProduct = async (req, res) => {

    try {

        const { category } = req.body;

        const categoryExists = await Category.findById(category);

        if (!categoryExists) {
            return res.status(400).json({
                success: false,
                message: "Invalid category"
            });
        }

        let imageUrl = "";

        //if image is sent

        if (req.file) {
            const uploadToCloudinary = () =>
                new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: "products" },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }

                    );

                    stream.end(req.file.buffer);

                });

            const result = await uploadToCloudinary();
            imageUrl = result.secure_url;
        }

        //frontend sends product name, price and description

        const product = new Product({
            ...req.body,
            image: imageUrl
        });

        const savedProduct = await product.save();

        res.status(201).json(savedProduct);

    } catch (error) {

        res.status(500).json({
            message: "failed to create problem",
            error: error.message,
        });

    }

};

//get all products

export const getAllProducts = async (req, res) => {

    try {

        const { category, type, color } = req.query;

        let filter = {};

        // if (category) filter.category = category; 

        if (category && category !== "All") {
            const categoryDoc = await Category.findOne
                ({
                    // name: category
                    name: { $regex: `^${category}$`, $options: "i" },
                });

            if (!categoryDoc) {
                return res.status(200).json([]);

            }

            filter.category = categoryDoc._id;
        }


        if (type) filter.type = type;

        if (color) filter.color = color;

        const products = await Product.find(filter).populate("category", "name");
        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({ message: "failed to fetch products", error });
    }

};


// Get new products
export const getNewProducts = async (req, res) => {
    const products = await Product.find({ isNew: true });
    res.json(products);
}

// Get sale products
export const getSaleProducts = async (req, res) => {
    const products = await Product.find({
        isOnSale: true,
        discountPercentage: { $gt: 0 }
    });
    res.json(products);
}


//find product by id

export const getProductById = async (req, res) => {

    try {

        // req.params.id → the product ID from the URL (/products/:id).

        const product = await Product.findById(req.params.id).populate("category", "name");;
        if (!product)
            return res.status(404).json({ message: "product not found" });
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: "failed to get product", error });
    }
};


//update product

export const updateProduct = async (req, res) => {

    try {

        let updatedData = { ...req.body };

        // if the new image is uploaded
        if (req.file) {
            const uploadToCloudinary = () =>
                new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream({
                        folder: "products"
                    },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        });
                    stream.end(req.file.buffer);
                });

            const result = await uploadToCloudinary();
            updatedData.image = result.secure_url;

        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true } //returns updated product, not old one.
        );

        if (!updatedProduct) return res.status(404).json({ message: "product not found" });
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: "failed to update product", error });
    }
};

//delete product

export const deleteProduct = async (req, res) => {

    try {

        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "product deleted successfully" });



    } catch (error) {
        res.status(500).json({ message: "failed to delete product", error });
    }
}


// ADD PRODUCT REVIEW
export const addProductReview = async (req, res) => {
    try {
        const { rating, comment, userName, email } = req.body;
        const productId = req.params.id;

        if (
            rating === undefined ||
            !comment ||
            !userName ||
            !email
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }


        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const review = {
            userName,
            email,
            rating: Number(rating),
            comment,
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;
        product.averageRating =
            product.reviews.reduce((acc, r) => acc + r.rating, 0) /
            product.reviews.length;

        await product.save();

        res.status(201).json({
            reviews: product.reviews,
            averageRating: product.averageRating,
            numReviews: product.numReviews,
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add review",
            error: error.message,
        });
    }
};


export const getProductsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Check if category exists
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        // Find products with this category
        const products = await Product.find({ category: categoryId }).populate("category", "name");

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch products by category",
            error: error.message,
        });
    }
};

// SEARCH PRODUCTS BY NAME
export const searchProducts = async (req, res) => {
    try {
        const { keyword } = req.query;

        if (!keyword) {
            return res.json([]);
        }

        const products = await Product.find({
            title: { $regex: keyword, $options: "i" }
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Search failed" });
    }
};

//most added products in wishlist

export const getTopWishedProducts = async (req,res) => {
    try{

        const products = await Product.find().
        sort({wishlistCount: -1}) //desending order
        .limit(5);


        return res.status(200).json(products);

    }catch(error){

        console.log(error);
        return res.status(500).json({message: "Server Error"});
    }
}


//get top selling products

export const getTopSellingProducts = async(req,res) => {
    try{

        const products = await Product.find().sort({purchaseCount: -1}).limit(5);

        return res.status(200).json(products);

    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Server Error"})
    }
}