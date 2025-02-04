import { Keyboard } from "grammy";
import { loadTranslations } from "./languageUtil";
import { SUPER_ADMIN_ID, ADMIN_IDS } from "../config/config"; // Import SUPER_ADMIN_ID and ADMIN_IDS

export async function getMainMenuKeyboard(language: string, role: string, userId: number) {
    try {
        const languageData = loadTranslations(language);

        // Debug log to check role
        console.log(`User role: ${role}`);

        const keyboard = new Keyboard()
            .text(languageData.dashboard)
            .text(languageData.buyProduct).row()
            .text(languageData.referral)
            .text(languageData.bonus).row()
            .text(languageData.support)
            .text(languageData.aboutUs).row()
            .text(languageData.extraMenu);

        // Check if user is admin or super admin, and display extra options
        if (role === "admin" || role === "super_admin") {
            keyboard.row().text(languageData.adminMenu);
        }

        return keyboard.resized();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Failed to generate menu keyboard: ${error.message}`);
        } else {
            console.error("An unknown error occurred");
        }
        throw new Error("Failed to generate main menu.");
    }
}
