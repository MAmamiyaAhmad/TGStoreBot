import { Context } from "grammy";
import { getMainMenuKeyboard } from "../utils/menuUtil";
import { saveUser } from "../database/db";
import { logger } from "../utils/loggerUtil";

export async function languageHandler(ctx: Context) {
    const userId = ctx.from?.id;
    const language = ctx.callbackQuery?.data;

    if (!userId || !language) {
        logger.error("User ID or language selection is missing.");
        await ctx.answerCallbackQuery("⚠️ Language selection failed.");
        return;
    }

    try {
        saveUser(userId, { role: "user", language });
        logger.info(`User ${userId} selected language: ${language}`);

        const mainMenu = await getMainMenuKeyboard(language, userId);
        await ctx.reply(`✅ Language set to ${language}! Here is your main menu:`, {
            reply_markup: mainMenu,
            parse_mode: "HTML"
        });

        await ctx.answerCallbackQuery();
    } catch (error) {
        logger.error(`Error in languageHandler: ${error}`);
        await ctx.reply("⚠️ Failed to update language. Please try again.");
    }
}
