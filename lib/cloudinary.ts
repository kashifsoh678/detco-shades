import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

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
  options: UploadOptions,
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

export const uploadStream = async (
  buffer: Buffer,
  options: UploadOptions,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        resource_type: options.resourceType || "auto",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Stream Upload Error:", error);
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
    upload.end(buffer);
  });
};

export const uploadFromStream = async (
  stream: Readable,
  options: UploadOptions,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        resource_type: options.resourceType || "auto",
        chunk_size: 6000000, // 6MB chunk size for better reliability
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Stream Pipe Error:", error);
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
    stream.pipe(upload);
  });
};

export const generateSignature = (params: Record<string, any>) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { ...params, timestamp },
    process.env.CLOUDINARY_API_SECRET!,
  );
  return { timestamp, signature };
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
