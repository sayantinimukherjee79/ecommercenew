import mongoose from "mongoose";
import Product from "../models/Product.js";
// import Category from "../models/categoryModel.js";
import dotenv from "dotenv";

dotenv.config();

//category rules

const rules = [
  // very specific first
  { category: "Watch", keywords: ["watch"] },

  { category: "Electronics", keywords: ["mobile", "laptop", "charger", "fan", "hair dryer","hair curler"] },

  { category: "Fragrance", keywords: ["perfume", "parfum", "eau"] },

  { category: "Haircare", keywords: ["shampoo", "conditioner"] },

   { category: "Makeup", keywords: ["lipstick", "foundation", "mascara", "highlighter", "blusher", "compact", "lip gloss", "palette"] },

  { category: "Skincare", keywords: ["cream", "serum", "moisturizer", "facewash", "sunscreen"] },

 

  { category: "Footwear", keywords: ["heels", "shoes", "sandal"] },

  { category: "Ethnic", keywords: ["saree", "lehenga", "salwar", "kurti", "anarkali", "sarara"] },

  { category: "Denim", keywords: ["denim"] },

  { category: "Men", keywords: ["shirt", "jeans", "trouser", "t-shirt", "jacket", "pant"] },

  { category: "Women", keywords: ["dress", "top", "pullover", "bodycon"] },

  { category: "Fitness", keywords: ["fitness", "gym", "workout", "activewear"] },

  { category: "Jewellery", keywords: ["necklace", "ring", "chain", "earring", "bracelet","pendant"] }
];


const run = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const products = await Product.find({category: {$exists: false}});

    console.log(`Found ${products.length} products without category\n`);

    for(const product of products){
        const text = `${product.title} ${product.description || ""}`.toLowerCase();

        let matchedCategory = null;

        for(const rule of rules) {
            if(rule.keywords.some(keyword => text.includes(keyword) )){
                matchedCategory = rule.category;
                break;
            }
        }

        console.log(
            `"${product.title}" -> ${matchedCategory ? matchedCategory : "NO MATCH"}`
        );
    }

    await mongoose.disconnect();

    console.log("\nScript finished (NO DATA UPDATED");
};

run();