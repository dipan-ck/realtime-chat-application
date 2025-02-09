import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const conn =  await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("MongoDB connected successfully");
        
    } catch (error) {
        console.log("MongoDB connection failed");
        process.exit(1);
        
    }
}