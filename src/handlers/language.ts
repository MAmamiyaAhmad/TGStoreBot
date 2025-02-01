import { Context } from "grammy";

export async function languageHandler(ctx: Context) {
    const selectedLanguage = ctx.match;
    await ctx.reply(`✅ You have selected: ${selectedLanguage}`);
}
