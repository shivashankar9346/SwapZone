import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Database is successfully connected");
    } catch (err) {
        console.log("Database connection failed:", err.message);
    }
};

export default connectDB;