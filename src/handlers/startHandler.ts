import { Context, Bot } from "grammy";
import { getLanguageKeyboard, getBotUsername } from "../utils/language/languageUtil";
import { logger } from "../utils/log/loggerUtil";
import { saveUser, getUser, setUserLanguage } from "../database/db"; // ✅ Perbaikan
import { getMainMenuKeyboard } from "../utils/menu/menuUtil";

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

        let user = await getUser(userId);
        if (user?.language) {
            const mainMenuKeyboard = await getMainMenuKeyboard(user.language, user.role || 'user', userId);
            const botUsername = await getBotUsername(bot); // ✅ Perbaikan

            const message = `<b>Main Menu</b>\n`
                + `•❂•─•─•❂•─•❂••❂•─•❂•─•─•❂•\n\n`
                + `👁‍🗨 Hello <b>${firstName}</b>, Welcome back to <b>${botUsername}</b>\n\n`
                + `🆔 <b>Name:</b> ${firstName}\n`
                + ` ├ <b>Username:</b> @${username}\n`
                + ` ├ <b>ID Telegram:</b> <code>${userId}</code>\n`
                + ` └ <b>Link:</b> <a href="https://t.me/${botUsername}?start=${userId}">Click Here</a>\n\n`
                + `•❂•─•─•❂•─•❂••❂•─•❂•─•─•❂•\n\n`;

            await ctx.replyWithPhoto("https://imgur.com/6g7KrfF", {
                caption: message,
                parse_mode: "HTML",
                reply_markup: mainMenuKeyboard,
            });

            return;
        }

        const botUsername = await getBotUsername(bot); // ✅ Perbaikan
        const message = `<b>🌏 Choose Language</b>\n`
            + `•❂•─•─•❂•─•❂••❂•─•❂•─•─•❂•\n\n`
            + `👁‍🗨 Hello <b>${firstName}</b>, Welcome to <b>${botUsername}</b>\n\n`
            + `🆔 <b>Name:</b> ${firstName}\n`
            + ` ├ <b>Username:</b> @${username}\n`
            + ` ├ <b>ID Telegram:</b> <code>${userId}</code>\n`
            + ` └ <b>Link:</b> <a href="https://t.me/${botUsername}?start=${userId}">Click Here</a>\n\n`
            + `<b>🌏 Please Choose your Language</b>\n\n`
            + `•❂•─•─•❂•─•❂••❂•─•❂•─•─•❂•\n\n`;

        await ctx.replyWithPhoto("https://imgur.com/1b0fIg3", {
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

// Handler untuk menangani pemilihan bahasa
export async function languageSelectionHandler(ctx: Context, language: string, bot: Bot) {
    const userId = ctx.from?.id;
    const firstName = ctx.from?.first_name;
    const username = ctx.from?.username || "Tidak Ada";

    if (!userId) {
        logger.error("User ID not found.");
        return;
    }

    try {
        // Simpan bahasa yang dipilih
        await setUserLanguage(userId, language); // ✅ Perbaikan
        logger.info(`User ${firstName} (${userId}) selected language: ${language}`);

        // Ambil data user yang baru diperbarui
        const user = await getUser(userId);
        const role = user?.role || 'user';
        const botUsername = await getBotUsername(bot); // ✅ Perbaikan
        const mainMenuKeyboard = await getMainMenuKeyboard(language, role, userId);

        const message = `<b>Main Menu</b>\n`
            + `•❂•─•─•❂•─•❂••❂•─•❂•─•─•❂•\n\n`
            + `👁‍🗨 Hello <b>${firstName}</b>, Welcome back to <b>${botUsername}</b>\n\n`
            + `🆔 <b>Name:</b> ${firstName}\n`
            + ` ├ <b>Username:</b> @${username}\n`
            + ` ├ <b>ID Telegram:</b> <code>${userId}</code>\n`
            + ` └ <b>Link:</b> <a href="https://t.me/${botUsername}?start=${userId}">Click Here</a>\n\n`
            + `•❂•─•─•❂•─•❂••❂•─•❂•─•─•❂•\n\n`;


        // ✅ Hapus ctx.reply() yang menampilkan teks berlebih
        await ctx.replyWithPhoto("https://imgur.com/6g7KrfF", {
            caption: message,
            parse_mode: "HTML", // Jika MarkdownV2: "MarkdownV2"
            reply_markup: mainMenuKeyboard,
        });

        logger.info(`Displayed Main Menu to ${firstName} (${userId}) after language selection.`);
    } catch (error) {
        logger.error(`Error in languageSelectionHandler: ${error}`);
        await ctx.reply("⚠️ Something went wrong. Please try again later.");
    }
}
