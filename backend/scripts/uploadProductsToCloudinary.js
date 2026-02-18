import cloudinary from "../config/cloudinary.js";
import { productImages } from "../productImages.js";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import dotenv from "dotenv";

dotenv.config();

//connect to mongodb

try {
  await mongoose.connect("mongodb+srv://sayantini:1234@cluster0.tpc1rc6.mongodb.net/backendDB?retryWrites=true&w=majority");
  console.log("MongoDB connected successfully!");
} catch (error) {
  console.error("MongoDB connection error:", error);
}

// 2️⃣ Function to upload images
const uploadImages = async () => {
    for (let [title, image] of Object.entries(productImages)) {
        try {
            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(image, {
                folder: "products",
            });

            console.log(`${title} uploaded:`, result.secure_url);

            // Update product in MongoDB by title
            await Product.findOneAndUpdate(
                { title },           // find product by title
                { image: result.secure_url }, // update image field
                { new: true }
            );

        } catch (error) {
            console.error(`Error uploading ${title}:`, error.message);
        }
    }

    console.log("All products updated!");
    await mongoose.disconnect();

};

// 3️⃣ Run the function
uploadImages();