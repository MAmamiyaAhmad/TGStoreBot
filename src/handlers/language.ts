import { Context } from "grammy";
import { logger } from "../utils/logger"; // Import the logger

export async function languageHandler(ctx: Context) {
    const selectedLanguage = ctx.match;
    try {
        // Log the language selection
        logger.info(`User ${ctx.from?.id} selected language: ${selectedLanguage}`);

        await ctx.reply(`✅ You have selected: ${selectedLanguage}`);
        
        // Log success
        logger.info(`Successfully sent language selection reply to ${ctx.from?.id}`);
    } catch (error: unknown) {
        // Type assertion to Error
        if (error instanceof Error) {
            logger.error(`Error in languageHandler: ${error.message}`);
        } else {
            logger.error("Unknown error in languageHandler");
        }
        await ctx.reply("⚠️ Something went wrong with language selection.");
    }
}
