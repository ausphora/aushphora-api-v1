import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3001;
export const JWT_USER_SECRET = process.env.JWT_USER_SECRET as string;

export const AUSPHORA_SENDERMAIL = process.env.AUSPHORA_SENDERMAIL;
export const AUSPHORA_MAIL_PASSWORD = process.env.AUSPHORA_MAIL_PASSWORD;