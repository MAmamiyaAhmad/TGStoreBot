import { Context } from "grammy";
import { getMainMenuKeyboard } from "../utils/menuUtil";
import { saveUser } from "../database/db";
import { logger } from "../utils/loggerUtil";
import { SUPER_ADMIN_ID } from "../config/config"; // Import SUPER_ADMIN_ID

export async function languageHandler(ctx: Context) {
    const userId = ctx.from?.id;
    const language = ctx.callbackQuery?.data;

    if (!userId || !language) {
        logger.error("User ID or language selection is missing.");
        await ctx.answerCallbackQuery("⚠️ Language selection failed.");
        return;
    }

    try {
        // Check if user is super admin or regular user
        const role = userId === SUPER_ADMIN_ID ? "super_admin" : "user"; // Use SUPER_ADMIN_ID from config

        saveUser(userId, { role, language });
        logger.info(`User ${userId} selected language: ${language}, Role: ${role}`);

        const mainMenu = await getMainMenuKeyboard(language, role, userId);
        await ctx.reply(`✅ Language set to ${language}!\n Here is your main menu:`, {
            reply_markup: mainMenu,
            parse_mode: "HTML"
        });

        await ctx.answerCallbackQuery();
    } catch (error) {
        logger.error(`Error in languageHandler: ${error}`);
        await ctx.reply("⚠️ Failed to update language. Please try again.");
    }
}
