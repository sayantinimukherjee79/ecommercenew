//this defines how a user is stored in mongodb

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        phone: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["customer", "vendor"],
            default: "customer",
        },

        //vendors only fields
        
        shopName: {
            type: String,
        },

        shopUrl: {
            type: String,
        }

    },

    { timestamps: true }
);


const User = mongoose.model("User", userSchema);

export default User;