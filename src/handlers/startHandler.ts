import { Context, Bot } from "grammy";
import { getLanguageKeyboard, getBotUsername } from "../utils/languageUtil";
import { logger } from "../utils/loggerUtil";
import { saveUser, getUser } from "../database/db";
import { getMainMenuKeyboard } from "../utils/menuUtil";

export async function startHandler(ctx: Context, bot: Bot) {
    const userId = ctx.from?.id;
    const firstName = ctx.from?.first_name;
    const username = ctx.from?.username || "Tidak Ada";

    if (!userId) {
        logger.error("User ID not found.");
        return;
    }

    try {
        logger.info(`User ${firstName} (${userId}) started the bot`);

        // Periksa apakah user sudah memiliki bahasa yang tersimpan
        const user = getUser(userId);
        if (user?.language) {
            const mainMenu = await getMainMenuKeyboard(user.language, userId);
            await ctx.reply("✅ Welcome back! Here is your main menu:", {
                reply_markup: mainMenu,
                parse_mode: "HTML"
            });
            return;
        }

        // Jika bahasa belum dipilih, tampilkan opsi bahasa
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

        logger.info(`Sent language selection to ${firstName} (${userId})`);
    } catch (error) {
        logger.error(`Error in startHandler: ${error}`);
        await ctx.reply("⚠️ Something went wrong. Please try again later.");
    }
}
