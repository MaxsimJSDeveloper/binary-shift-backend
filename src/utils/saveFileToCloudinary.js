import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import { env } from './env.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: env('CLOUD_NAME'),
  api_key: env('API_KEY'),
  api_secret: env('API_SECRET'),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
