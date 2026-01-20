import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface UploadOptions {
  folder: string;
  resourceType?: "image" | "video" | "auto";
}

export const uploadToCloudinary = async (
  fileStr: string,
  options: UploadOptions
) => {
  try {
    const result = await cloudinary.uploader.upload(fileStr, {
      folder: options.folder,
      resource_type: options.resourceType || "auto",
    });
    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};

export const deleteFromCloudinary = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    throw error;
  }
};

export default cloudinary;
