import cloudinary from "cloudinary";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product.js"; // 🔴 adjust path if needed

// Load env variables
dotenv.config();

// --------------------
// Cloudinary Config
// --------------------
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --------------------
// MongoDB Connect
// --------------------
const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
};

// --------------------
// ONLY NEW PRODUCTS
// --------------------
const newProducts = {
    "Sofa Set": "https://images.pexels.com/photos/6070190/pexels-photo-6070190.jpeg",
    "Recliner Chair": "https://images.pexels.com/photos/3705539/pexels-photo-3705539.jpeg",
    "Table": "https://images.pexels.com/photos/280471/pexels-photo-280471.jpeg",
    "TV": "https://images.pexels.com/photos/5490302/pexels-photo-5490302.jpeg",
    "Dressing Table": "https://images.pexels.com/photos/4986116/pexels-photo-4986116.jpeg",
    "Bookshelf": "https://images.pexels.com/photos/1125130/pexels-photo-1125130.jpeg",
    "Bed": "https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg",
    "Closet 1": "https://images.pexels.com/photos/6508346/pexels-photo-6508346.jpeg",
    "Closet 2": "https://images.pexels.com/photos/4065445/pexels-photo-4065445.jpeg",
    "Smartphone": "https://images.pexels.com/photos/3756879/pexels-photo-3756879.jpeg",
    "Tablet": "https://images.pexels.com/photos/2320369/pexels-photo-2320369.jpeg",
    "Smartwatch": "https://images.pexels.com/photos/4482936/pexels-photo-4482936.jpeg",
    "Power Bank": "https://images.pexels.com/photos/5208772/pexels-photo-5208772.jpeg",
    "Wireless Earbuds": "https://images.pexels.com/photos/6857209/pexels-photo-6857209.jpeg",
    "Laptop": "https://images.pexels.com/photos/939331/pexels-photo-939331.jpeg",
    "Electric Kettle": "https://images.pexels.com/photos/4108671/pexels-photo-4108671.jpeg",
    "Coffee Maker": "https://images.pexels.com/photos/35258821/pexels-photo-35258821.jpeg",
    "Gaming Controller": "https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg",
};

// --------------------
// Upload + DB Update
// --------------------
const uploadNewImages = async () => {
    try {
        await connectDB();

        console.log("\n📤 Uploading images & updating DB...\n");

        for (const [name, url] of Object.entries(newProducts)) {
            const uploadResult = await cloudinary.v2.uploader.upload(url, {
                folder: "products",
                public_id: name.replace(/\s+/g, "-").toLowerCase(),
                overwrite: false,
            });

            const updatedProduct = await Product.findOneAndUpdate(
                { title: { $regex: new RegExp(`^${name}$`, "i") } },
                { image: uploadResult.secure_url },
                { new: true }
            );


            if (updatedProduct) {
                console.log(`✅ ${name} updated`);
            } else {
                console.log(`❌ Product not found in DB: ${name}`);
            }
        }

        console.log("\n🎉 DONE: Cloudinary + DB updated");
        process.exit();
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
};

// --------------------
// Run Script
// --------------------
uploadNewImages();
