import { Bot, Context } from "grammy";  // Import Bot and Context
import { getMainMenuKeyboard } from "../utils/menuUtil";
import { saveUser } from "../database/db";
import { logger } from "../utils/loggerUtil";
import { SUPER_ADMIN_ID } from "../config/config"; // Import SUPER_ADMIN_ID
import { getBotUsername } from "../utils/languageUtil"; // Import getBotUsername

export async function languageHandler(ctx: Context, bot: Bot) {  // Add 'bot' as a parameter
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

        const botUsername = await getBotUsername(bot);  // Pass 'bot' to the function
        const mainMenu = await getMainMenuKeyboard(language, role, userId);
        await ctx.replyWithPhoto("https://i.imgur.com/mXrMZsI.jpg", {
            caption: `<b>Main Menu</b>\n`  // Or add your message here in HTML format
            + `•❂•─•─•❂•─•❂••❂•─•❂•─•─•❂•\n\n`
            + `👁‍🗨 Welcome back to <b>${botUsername}</b>\n`
            + `•❂•─•─•❂•─•❂••❂•─•❂•─•─•❂•\n\n`,
            parse_mode: "HTML", // Or change to MarkdownV2 if needed
            reply_markup: mainMenu,
        });             

        await ctx.answerCallbackQuery();
    } catch (error) {
        logger.error(`Error in languageHandler: ${error}`);
        await ctx.reply("⚠️ Failed to update language. Please try again.");
    }
}
