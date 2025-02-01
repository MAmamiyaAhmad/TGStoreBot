import { Context, NextFunction } from "grammy";
import { CHANNEL_ID } from "./config";

export async function checkJoin(ctx: Context, next: NextFunction) {
    if (!ctx.from) return;
    
    try {
        const chatMember = await ctx.api.getChatMember(CHANNEL_ID, ctx.from.id);
        if (["member", "administrator", "creator"].includes(chatMember.status)) {
            return next();
        } else {
            await ctx.reply("❌ Anda harus bergabung dengan channel terlebih dahulu!\n\n🔗 Join di sini: https://t.me/YOUR_CHANNEL", {
                parse_mode: "HTML",
            });
        }
    } catch (error) {
        console.error("Error checking join status:", error);
        await ctx.reply("Terjadi kesalahan saat memeriksa keanggotaan. Coba lagi nanti.");
    }
}
