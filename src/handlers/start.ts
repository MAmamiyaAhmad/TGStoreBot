import { Context, Bot } from "grammy";
import { getLanguageKeyboard, getBotUsername } from "../utils";

export async function startHandler(ctx: Context, bot: Bot) {
    const userId = ctx.from?.id;
    const firstName = ctx.from?.first_name;
    const username = ctx.from?.username || "Tidak Ada";

    // Ambil nama bot secara otomatis
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
}
