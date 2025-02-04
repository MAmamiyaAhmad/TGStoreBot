import { Keyboard } from "grammy";
import { getUser } from "../database/db";
import { User } from "../types/types";
import { loadTranslations } from "./languageUtil";
import dotenv from "dotenv";

dotenv.config();

const SUPER_ADMIN_ID = process.env.SUPER_ADMIN_ID ? Number(process.env.SUPER_ADMIN_ID) : 0;
const ADMIN_IDS = process.env.ADMIN_IDS ? process.env.ADMIN_IDS.split(",").map(Number) : [];

export async function getMainMenuKeyboard(language: string, userId: number) {
    try {
        const languageData = loadTranslations(language);
        const userData = getUser(userId);
        const user: User | undefined = typeof userData === "object" ? (userData as User) : undefined;

        const keyboard = new Keyboard()
            .text(languageData.dashboard)
            .text(languageData.buyProduct).row()
            .text(languageData.referral)
            .text(languageData.bonus).row()
            .text(languageData.support)
            .text(languageData.aboutUs).row()
            .text(languageData.extraMenu);

        if (user && (user.role === "admin" || user.role === "super_admin")) {
            keyboard.row().text(languageData.adminMenu);
        }

        return keyboard.resized();
    } catch (error) {
        console.error(`Failed to generate menu keyboard: ${error}`);
        throw new Error("Failed to generate main menu.");
    }
}
