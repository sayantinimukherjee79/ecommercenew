import mongoose from "mongoose";
import dotenv from "dotenv";
import cloudinary from "../config/cloudinary.js"; // adjust path from scripts folder
import Product from "../models/Product.js";

dotenv.config();

const productsToUpdate = [
  {
    title: "Bloom Eau de Perfume", // exact product title in DB
    url: "https://images.pexels.com/photos/1961791/pexels-photo-1961791.jpeg" // your Pexels image URL
  },
  // add more products here if needed
  // { title: "Another Product", url: "IMAGE_URL" },
];

const uploadImages = async () => {
  try {
    // 1️⃣ Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI); // make sure you have MONGO_URI in .env
    console.log("MongoDB connected successfully!");

    for (let product of productsToUpdate) {
      const { title, url } = product;

      // 2️⃣ Upload to Cloudinary
      const result = await cloudinary.uploader.upload(url, {
        folder: "products",
      });

      console.log(`${title} uploaded to Cloudinary:`, result.secure_url);

      // 3️⃣ Update product in MongoDB
      const updatedProduct = await Product.findOneAndUpdate(
        { title }, // find product by title
        { image: result.secure_url }, // update image field
        { new: true }
      );

      if (updatedProduct) {
        console.log(`${title} updated in DB successfully!`);
      } else {
        console.log(`Product "${title}" not found in DB.`);
      }
    }

    console.log("All products processed!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

uploadImages();
