import { InlineKeyboard } from "grammy";
import { Bot } from "grammy";

export function getLanguageKeyboard() {
    return new InlineKeyboard()
        .text("🇬🇧 English", "English")
        .text("🇩🇪 Deutsch", "Germany")
        .text("🇮🇩 Indonesian", "Indonesian")
        .row()
        .text("🇷🇺 Русский", "Russian")
        .text("🇮🇹 Italiano", "Italy")
        .text("🇰🇷 한국어", "Korean")
        .row()
        .text("🇲🇾 Malay", "Malaysian")
        .text("🇪🇦 Español", "Spanish")
        .text("🇫🇷 France", "France")
        .row()
        .text("🇧🇷 Português", "Brazilian")
        .text("🇵🇭 Tagalog", "Philippines")
        .text("🇮🇳 हिन्दी", "Hindi")
        .row()
        .text("🇸🇦 العربية", "Arabian")
        .text("🇯🇵 日本", "Japan")
        .text("🇵🇱 Polska", "Poland")
        .row()
        .text("🇨🇳 中文", "Chinese");
}

export async function getBotUsername(bot: Bot) {
    const botInfo = await bot.api.getMe();
    return botInfo.username;
}
