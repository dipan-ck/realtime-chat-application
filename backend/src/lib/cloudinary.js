import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import path from "path";

 dotenv.config({ path: "../.env" });
//  console.log("Loaded ENV Variables:", process.env);

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Missing Cloudinary configuration in environment variables");
}

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;
