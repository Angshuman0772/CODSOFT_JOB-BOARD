/**
 * Cloudinary SDK configuration helper.
 *
 * Purpose: initialize Cloudinary credentials once during server startup.
 */
import { v2 as cloudinary } from "cloudinary";

/**
 * Configures the global Cloudinary client from environment variables.
 *
 * @returns {void}
 * @sideeffects Mutates Cloudinary's global runtime configuration.
 */
const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export default connectCloudinary;
