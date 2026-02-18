// this file is main entry point of backend, it starts server, loads environment variables,connects database, applies middlewire

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import productRouter from "./routes/productRouter.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";



// loads env
dotenv.config();

//connect MongoDB
connectDB();

const app = express();

//middleware

app.use(cors());
app.use(express.json());

//use the routes as middlewire

app.use("/api/auth",authRoutes);

app.use("/api/protected",protectedRoutes);

app.use("/products", productRouter);

app.use("/api/categories", categoryRoutes);

app.use("/api/cart",cartRoutes);

app.use("/api/wishlist", wishlistRoutes);

app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);

app.use("/api/payment", paymentRoutes);



//test route

// it tells When someone makes a GET request to /, run this function.

app.get("/",(req,res) => {
    res.send("backend is running successfully");
});

const PORT = process.env.PORT || 5000;

//this line Opens a door (port) on this computer and wait for requests.

app.listen(PORT,()=>{
    console.log("server is running on port",PORT);
});