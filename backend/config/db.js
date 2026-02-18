// create mongodb connection with backend
//index.js will use this file
import mongoose from "mongoose";

// we are using async await because, connecting to mongodb takes time

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("db is connected");
    }catch (error){
        console.log("db is not connected", error.message);
        process.exit(1);

    }
};

export default connectDB;

