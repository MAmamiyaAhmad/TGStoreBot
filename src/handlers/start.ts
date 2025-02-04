import { Context, Bot } from "grammy";
import { getLanguageKeyboard, getBotUsername } from "../utils/language";
import { logger } from "../utils/logger"; // Import the logger

export async function startHandler(ctx: Context, bot: Bot) {
    const userId = ctx.from?.id;
    const firstName = ctx.from?.first_name;
    const username = ctx.from?.username || "Tidak Ada";

    // Log user info
    logger.info(`User ${firstName} (${userId}) started the bot`);

    try {
        // Get bot username
        const botUsername = await getBotUsername(bot);

        const message = `<b>🌏 Choose Language</b>\n`
            + `•❂•─•─•❂•─•❂••❂•─•❂•─•─•❂•\n\n`
            + `🆔 <b>Name:</b> ${firstName}\n`
            + ` \u251c <b>Username:</b> @${username}\n`
            + ` \u251c <b>ID Telegram:</b> <code>${userId}</code>\n`
            + ` \u2514 <b>Link:</b> <a href="https://t.me/${botUsername}?start=${userId}">Click Here</a>\n\n`
            + `👁‍🗨 Hello <b>${firstName}</b>, Welcome to <b>Bot Monitoring</b>\n<b>🌏 Please Choose your Language</b>\n\n`
            + `•❂•─•─•❂•─•❂••❂•─•❂•─•─•❂•\n\n`;

        await ctx.replyWithPhoto("https://imgur.com/a/mXrMZsI", {
            caption: message,
            parse_mode: "HTML",
            reply_markup: getLanguageKeyboard(),
        });

        // Log success
        logger.info(`Sent start message to ${firstName} (${userId})`);
    } catch (error: unknown) {
        // Type assertion to Error
        if (error instanceof Error) {
            logger.error(`Error in startHandler: ${error.message}`);
        } else {
            logger.error("Unknown error in startHandler");
        }
        await ctx.reply("⚠️ Something went wrong. Please try again later.");
    }
}
