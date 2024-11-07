// cloudinaryConfig.js
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
// import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFile = async (filePaths) => {
  try {
    if (Array.isArray(filePaths)) {
      // Handle multiple file uploads
      const uploadPromises = filePaths.map((filePath) =>
        cloudinary.uploader.upload(filePath)
      );
      const results = await Promise.all(uploadPromises);
      return results.map((result) => result.secure_url); // Array of URLs for multiple uploads
    } else {
      const result = await cloudinary.uploader.upload(filePaths);
      console.log(result);
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};

export { cloudinary };
