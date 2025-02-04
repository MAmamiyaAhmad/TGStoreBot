import { InlineKeyboard } from "grammy";
import { Bot } from "grammy";
import * as fs from "fs";
import path from "path";

// Fungsi untuk memuat file terjemahan berdasarkan bahasa yang dipilih
export function loadTranslations(language: string) {
    const filePath = path.join(__dirname, "..", "languages", `${language}.json`);

    try {
        const translations = JSON.parse(fs.readFileSync(filePath, "utf8"));
        return translations;
    } catch (error: unknown) {
        console.error(`Failed to load translations for ${language}:`, (error as Error).message);
        const defaultPath = path.join(__dirname, "..", "languages", "english.json");
        return JSON.parse(fs.readFileSync(defaultPath, "utf8"));
    }
}

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
