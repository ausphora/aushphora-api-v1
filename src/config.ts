import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3001;
export const JWT_USER_SECRET = process.env.JWT_USER_SECRET as string;
export const FRONTEND_URL = process.env.FRONTEND_URL as string;

export const AUSPHORA_SENDERMAIL = process.env.AUSPHORA_SENDERMAIL;
export const AUSPHORA_MAIL_PASSWORD = process.env.AUSPHORA_MAIL_PASSWORD;


export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;