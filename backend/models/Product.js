//The model defines how product data is stored in your database, not how it looks on the frontend.

import mongoose from "mongoose";

/* 🔹 Review schema */

const reviewSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

        comment: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// productSchema

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String,

    },

    image: {
        type: String,
        required: true
    },

    stock: {
        type: Number,
        required: true,
        default: 0
    },

    brand: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    category: {
        //this says, This field will store the _id of another MongoDB document
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },

    type: {
        type: String,
        required: false
    },

    color: {
        type: String,
        required: false
    },


    reviews: [reviewSchema],

    averageRating: {
        type: Number,
        default: 0,
    },

    numReviews: {
        type: Number,
        default: 0,
    },


    isNew: {
        type: Boolean,
        default: false
    },

    isOnSale: {
        type: Boolean,
        default: false
    },

    discountPercentage: {
        type: Number,
        default: 0
    },

    wishlistCount: {
        type: Number,
        default: 0
    },

    cartCount: {
        type: Number,
        default: 0
    },

    purchaseCount: {
        type: Number,
        default: 0
    },

    deliveryDuration: {
        type: Number,
        default: 2
    }

},

    { timestamps: true }

);

export default mongoose.model("Product", productSchema);