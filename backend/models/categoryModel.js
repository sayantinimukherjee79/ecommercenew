//defines category schema in database

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    
    name: {
        type: String,
        unique: true,
        required: true,
    },

    slug: {

        type: String,
        unique: true,
        required: true,
    },

    description: {
        type: String,
        required: true,
        
    },

   
},

{timestamps: true}
)

const Category = mongoose.model("Category", categorySchema);

export default Category;