import * as dotenv from "dotenv";
dotenv.config();

export const BOT_TOKEN = process.env.BOT_TOKEN as string;
export const SUPER_ADMIN_ID = parseInt(process.env.SUPER_ADMIN_ID as string); // Ensure this exists in your .env
export const ADMIN_IDS = process.env.ADMIN_IDS?.split(",").map(id => parseInt(id)) || [];
