import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'martneries',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  } as any,
});

export const deleteFromCloudinary = async (url: string) => {
  try {
    const urlParts = url.split('/');
    const fileWithExtension = urlParts[urlParts.length - 1];
    const publicId = `martneries/${fileWithExtension.split('.')[0]}`;
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
  }
};

export const upload = multer({ storage: storage });
export { cloudinary };
